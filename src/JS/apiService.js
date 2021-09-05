// - Есть файл apiService.js с дефолтным экспортом объекта отвечающего за логику HTTP-запросов к API
const MY_KEY = "23141283-b767010b5d5526766e0fab830";

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export default function getPictures (imageType, imageOrientation, imagesPerPage, query, page) {
  return axios.get(`?image_type=${imageType}&orientation=${imageOrientation}&q=${query}&page=${page}&per_page=${imagesPerPage}&key=${MY_KEY}`)
}

// URL-строка запроса:

// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=MY_KEY

