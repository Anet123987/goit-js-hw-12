import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loadMoreButton = document.querySelector('#load-more');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');
let lightbox;

// Экспортируем нужные функции
export function createGallery(images) {
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
  }).join(''); // Преобразование массива в строку

  if (gallery) {
    gallery.insertAdjacentHTML('beforeend', markup); // Вставка HTML в галерею

    if (!lightbox) {
      // Если Lightbox еще не создан, создаем его
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        closeText: '✖',
        close: true,
        showCounter: false,
      });

      // Обработчики для удаления класса "sl-image" при переходе между изображениями
      lightbox.on('show.simplelightbox', removeSlImageClass);
      lightbox.on('next.simplelightbox', removeSlImageClass);
      lightbox.on('prev.simplelightbox', removeSlImageClass);
    } else {
      // Если Lightbox уже создан, обновляем его
      lightbox.refresh();
    }
  }

  scrollPage(); // Выполняем прокрутку страницы
}

// Функция для удаления класса "sl-image"
function removeSlImageClass() {
  const currentImage = document.querySelector('.sl-image');
  if (currentImage) {
    currentImage.classList.remove('sl-image');
  }
}

// Функция для прокрутки страницы на две высоты карточки
function scrollPage() {
  const firstElement = gallery?.firstElementChild; // Проверка на существование первого элемента
  if (firstElement) {
    const cardHeight = firstElement.getBoundingClientRect().height; // Получаем высоту карточки
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

// Функции для управления элементами интерфейса
export function clearGallery() {
  if (gallery) {
    gallery.innerHTML = ''; // Очищаем галерею
  }
}

export function toggleLoader(show) {
  if (!loader) return;
  loader.classList.toggle('hidden', !show); // Показ/скрытие индикатора загрузки
}

export function toggleLoadMoreButton(show) {
  if (!loadMoreButton) return;
  loadMoreButton.classList.toggle('hidden', !show); // Показ/скрытие кнопки "Load more"
}

export function showLoader() {
  toggleLoader(true);
}

export function hideLoader() {
  toggleLoader(false);
}

export function showLoadMoreButton() {
  toggleLoadMoreButton(true);
}

export function hideLoadMoreButton() {
  toggleLoadMoreButton(false);
}
