import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '50174992-a37a037319a3aab3105cbedec';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query,page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page:page,
    per_page: 15,
  };

 try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося отримати зображення. Спробуйте пізніше.',
      position: 'topRight',
      timeout: 5000
    });
    throw error;  }
}