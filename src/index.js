// - Задание - поиск изображений
// Напиши небольшое приложение поиска и просмотра изображений по ключевому слову
// Кнопка 'Load more'
// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе с предыдущими.
// Pixabay API поддерживает пагинацию, пусть в ответе приходит по 12 объектов, установлено в параметре per_page. По умолчанию параметр page равен 1. При каждом последующем запросе page увеличивается на 1, а при поиске по новому ключевому слову необходимо сбрасывать его значение в 1.

// Страница должна автоматически плавно проскроливаться после рендера изображений, чтобы перевести пользователя на следующие загруженные изображения. Используй метод Element.scrollIntoView().

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
// Дополнительно
// Можно добавить плагин нотификаций, например pnotify, и показывать нотификации на результат HTTP-запросов
// Можно добавить функционал отображения большой версии изображения через плагин модального окна, например basicLightbox, при клике на изображение галереи
// Вместо кнопки Load more можно сделать бесконечную загрузку при скроле используя Intersection Observer.

import './style.css'
import { getPictures } from './JS/apiService';
import cardTpl from './templates/photo-card.hbs';
import { alert, defaultModules, notice, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn')
};

refs.loadMoreBtn.style.visibility = "hidden";

let pageNumber = 1;
let searchQuery = '';

// const options = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 0.5
// }

// const observer = new IntersectionObserver(
//     onLoadMore,
//     options
// );

const onSearchImages = (event) => {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.query.value.trim();
  getPictures(searchQuery,  pageNumber)
    .then(({ data: { hits } }) => {
      refs.gallery.innerHTML = cardTpl(hits);
      refs.form.reset();
      console.log(hits.length);
      if (hits.length > 11) {
        refs.loadMoreBtn.style.visibility = "visible";
        info({ text: `To load more click Load more button` });
        }
    })
    .catch(
      err => error({ text: `${err.message}`})); 
}

const onLoadMoreImages = () => {
  pageNumber += 1;
  getPictures(searchQuery,  pageNumber)
    .then(({ data: { hits } }) => {
      refs.gallery.insertAdjacentHTML('beforeend', cardTpl(hits));
      // refs.gallery.scrollIntoView({
      //       behavior: 'smooth',
      //       block: 'end',
      //       });
      console.log(hits.length);
        if (hits.length < 12) {
            refs.loadMoreBtn.style.visibility = "hidden";
            
        }
        // if (state.page === 2) {
        //     observer.observe(refs.loadMoreBtn);
        // }
    }      
    )
  .catch(err => console.log(err));
}

refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMoreImages);



// function openModal(e) {
//     if (e.target.nodeName !== "IMG") {
//     return
//     }
//     const instance = basicLightbox.create(`
//     <img src="${e.target.dataset.src}" width="800" height="600">
// `)
//     instance.show()

// }


// const renderCards = () => {};


