import axios from 'axios';

const API_KEY = '50910167-da0c49dcf69b8279e7055dacc';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 40) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}