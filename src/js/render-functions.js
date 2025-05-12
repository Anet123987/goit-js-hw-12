import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('#gallery'); 
const loader = document.querySelector('#loader'); 
let lightbox;

export function renderGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="info">
          <div class="info-item">
            <p class="label">Likes</p>
            <p class="value">${likes}</p>
          </div>
          <div class="info-item">
            <p class="label">Views</p>
            <p class="value">${views}</p>
          </div>
          <div class="info-item">
            <p class="label">Comments</p>
            <p class="value">${comments}</p>
          </div>
          <div class="info-item">
            <p class="label">Downloads</p>
            <p class="value">${downloads}</p>
          </div>
        </div>
      </li>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if(!lightbox){
    lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    closeText: '✖',  
    close: true,    
    showCounter: false 
  });

  
  lightbox.on('show.simplelightbox', function () {
    const currentImage = document.querySelector('.sl-image');
    
    if (currentImage) {
      currentImage.classList.remove('sl-image'); 
    }
  });

  
  lightbox.on('next.simplelightbox', function () {
    const currentImage = document.querySelector('.sl-image');
    if (currentImage) {
      currentImage.classList.remove('sl-image'); 
    }
  });

  lightbox.on('prev.simplelightbox', function () {
    const currentImage = document.querySelector('.sl-image');
    if (currentImage) {
      currentImage.classList.remove('sl-image'); 
    }
  });
  } else{
  lightbox.refresh(); 
}
}

export function clearGallery() {
  if (gallery) {
    gallery.innerHTML = '';
  }
}

export function showLoader() {
  
  if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
 
  if (loader) loader.classList.add('hidden');
}


