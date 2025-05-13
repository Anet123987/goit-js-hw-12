import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loadMoreButton = document.querySelector('#load-more');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');
const bottomLoaderText = document.querySelector('#bottom-loader-text');
let lightbox;

export function createGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="info">
          <div class="info-item"><p class="label">Likes</p><p class="value">${likes}</p></div>
          <div class="info-item"><p class="label">Views</p><p class="value">${views}</p></div>
          <div class="info-item"><p class="label">Comments</p><p class="value">${comments}</p></div>
          <div class="info-item"><p class="label">Downloads</p><p class="value">${downloads}</p></div>
        </div>
      </li>
    `;
  }).join('');

  if (gallery) {
    gallery.insertAdjacentHTML('beforeend', markup);

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        closeText: '✖',
        close: true,
        showCounter: false,
      });

      lightbox.on('show.simplelightbox', removeSlImageClass);
      lightbox.on('next.simplelightbox', removeSlImageClass);
      lightbox.on('prev.simplelightbox', removeSlImageClass);
    } else {
      lightbox.refresh();
    }
  }
}

function removeSlImageClass() {
  const currentImage = document.querySelector('.sl-image');
  if (currentImage) {
    currentImage.classList.remove('sl-image');
  }
}

export function scrollPage() {
  const cardHeight = gallery?.firstElementChild?.getBoundingClientRect().height;
  if (cardHeight) {
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}



export function showLoader() {
  loader?.classList.remove('hidden'); 
}

export function hideLoader() {
  loader?.classList.add('hidden'); 
}

export function showLoadMoreButton() {
  loadMoreButton?.classList.remove('hidden'); 
}

export function hideLoadMoreButton() {
  loadMoreButton?.classList.add('hidden'); 
}

export function showBottomLoaderText() {
  bottomLoaderText?.classList.remove('hidden');
}

export function hideBottomLoaderText() {
  bottomLoaderText?.classList.add('hidden');
}






  