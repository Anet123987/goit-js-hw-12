import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim(); 

  if (!query) return; 

  clearGallery(); 
  showLoader();  

  try {
    const data = await fetchImages(query); 

    if (data.hits.length === 0) { 
      iziToast.warning({
        title: 'Oops',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoader(); 
      return;
    }

    renderGallery(data.hits); 
    hideLoader(); 

   
    e.target.elements['search-text'].value = ''; 

    
    e.target.elements['search-text'].focus();

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images.',
      position: 'topRight',
    });
    hideLoader(); 
  }
});
