import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollPage,
  showBottomLoaderText,   
  hideBottomLoaderText 
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more');

let currentPage = 1;
let currentQuery = '';
let totalPages = 0;
const IMAGES_PER_PAGE = 15;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  currentQuery = e.target.elements['search-text'].value.trim();
  currentPage = 1;

  if (!currentQuery) return;

  clearGallery();
  showLoader();
  hideLoadMoreButton();
hideBottomLoaderText ();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);
    const hasResults = handleGalleryResponse(data);

    if (hasResults) {
      form.reset();
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
    hideLoader();
    hideBottomLoaderText ();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  showBottomLoaderText();  
  hideLoadMoreButton(); 
  
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hasResults = handleGalleryResponse(data);

    if (hasResults) {
      scrollPage();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
    hideLoader();
    hideBottomLoaderText();  
  }
});

function handleGalleryResponse(data) {
  if (!data.hits.length) {
    iziToast.info({
      title: 'Info',
      message: 'No images found.',
      position: 'topRight',
    });
    hideLoader();
    hideBottomLoaderText();  
    return false;
  }

  createGallery(data.hits); 
  hideLoader();  

  
  hideBottomLoaderText();

  if (currentPage >= totalPages) {
    hideLoadMoreButton(); 
    iziToast.info({
      title: 'End of Results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreButton(); 
  }

  return true;
}