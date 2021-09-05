import './style.css';
import {refs} from './JS/refs.js';
import {searchOptions} from './JS/options.js';
// import {observerOptions} from './JS/options.js';
import getPictures from './JS/apiService';
import cardTpl from './templates/photo-card.hbs';
import * as basicLightbox from 'basiclightbox';
import {
  alert,
  defaultModules,
  notice,
  info,
  success,
  error,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

// const formRef = document.querySelector('#search-form');
// const galleryOptionsRef = document.querySelector('.gallery-options');
// const refs = {
//   imageType: galleryOptionsRef.querySelector('#image-type'),
//   imageOrientation: galleryOptionsRef.querySelector('#image-orientation'),
//   imagesPerPage: galleryOptionsRef.querySelector('[name="images-per-page"]'),
//   imageQuery: formRef.querySelector('[name="query"]'),
//   gallery: document.querySelector('.gallery'),
//   // formSubmitBtn: formRef.querySelector('.form-submit'),
//   loadMoreBtn: document.querySelector('.load-more-btn'),
//   // labelSpan: document.querySelector('.label'),
//   loaderSpan: document.querySelector('.loader'),
// };
// const observer = new IntersectionObserver(onLoadMoreImages, observerOptions);

refs.loadMoreBtn.style.visibility = 'hidden';
refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMoreImages);
refs.gallery.addEventListener('click', openModal);

function onSearchImages(event) {
  event.preventDefault();
  searchOptions.query = event.currentTarget.elements.query.value.trim();
  searchOptions.imageType = refs.imageType.value;
  searchOptions.imageOrientation = refs.imageOrientation.value;
  searchOptions.imagesPerPage = refs.imagesPerPage.value;
  getPictures(
    searchOptions.imageType,
    searchOptions.imageOrientation,
    searchOptions.imagesPerPage,
    searchOptions.query,
    searchOptions.pageNumber,
  )
    .then(({ data: { hits } }) => {
      refs.gallery.innerHTML = cardTpl(hits);
      if (hits.length > searchOptions.imagesPerPage - 1) {
        refs.loadMoreBtn.style.visibility = 'visible';
      }
    })
    .catch(err => error({ text: `${err.message}` }));
}

function onLoadMoreImages() {
  searchOptions.pageNumber += 1;
  getPictures(
    searchOptions.imageType,
    searchOptions.imageOrientation,
    searchOptions.imagesPerPage,
    searchOptions.query,
    searchOptions.pageNumber,
  )
    .then(({ data: { hits } }) => {
      refs.gallery.insertAdjacentHTML('beforeend', cardTpl(hits));
      refs.gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      if (hits.length < searchOptions.imagesPerPage) {
        refs.loadMoreBtn.style.visibility = 'hidden';
      }
      // if (searchOptions.pageNumber === 2) {
      //     observer.observe(refs.loadMoreBtn);
      // }
    })
    .catch(err => console.log(err));
}

function openModal(e) {
    if (e.target.nodeName !== "IMG") {
    return
    }
    const instance = basicLightbox.create(`
    <img src="${e.target.dataset.src}" width="800" height="600">
`)
    instance.show()

}

