import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '50174992-a37a037319a3aab3105cbedec';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGES_PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: IMAGES_PER_PAGE,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Warning!',
      message: 'Failed to load images. Try again later.',
      position: 'topRight',
      timeout: 5000,
    });
    throw error;
  }
}
