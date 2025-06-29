import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({ message: 'Будь ласка, введіть слово для пошуку!', position: 'topRight' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);
    totalHits = data.totalHits;
    const images = data.hits;

    if (images.length === 0) {
      iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!', position: 'topRight' });
      hideLoadMore();
    } else {
      createGallery(images);
      if (totalHits > perPage) {
        showLoadMore();
      }
    }
  } catch (err) {
    iziToast.error({ message: 'Сталася помилка. Спробуйте ще раз.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMore();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);
    const images = data.hits;
    createGallery(images);

    // Плавний скрол до нових картинок
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    // Проверка на конец результатов
    if (currentPage * perPage >= totalHits) {
      hideLoadMore();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
    } else {
      showLoadMore();
    }
  } catch (err) {
    iziToast.error({ message: 'Сталася помилка. Спробуйте ще раз.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});