import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const params = new URLSearchParams(window.location.search);
const initialQuery = params.get('search-text');
if (initialQuery) {
  form.elements['search-text'].value = initialQuery;
  form.dispatchEvent(new Event('submit'));
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({ message: 'Будь ласка, введіть слово для пошуку!', position: 'topRight' });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    const images = data.hits;

    if (images.length === 0) {
      iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!', position: 'topRight' });
    } else {
      createGallery(images);
    }
  } catch (err) {
    iziToast.error({ message: 'Сталася помилка. Спробуйте ще раз.', position: 'topRight' });
  } finally {
    hideLoader();
  } 
});