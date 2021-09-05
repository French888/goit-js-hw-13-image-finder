import {getPictures} from "./services/apiService"
import cardTemplate from "./cards.hbs"
import * as basicLightbox from 'basiclightbox'


const refs = {
    gallery: document.querySelector('.gallery'),
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.button')
 }

 const state = {
     page: 1,
     query: '',
 }

 refs.form.addEventListener('submit', onSearch);
 refs.loadMoreBtn.addEventListener('click', onLoadMore);
 refs.gallery.addEventListener('click', openModal);
 refs.loadMoreBtn.style.visibility = "hidden";
 
 function onSearch(e){
     e.preventDefault();
     state.page = 1;
     refs.loadMoreBtn.style.visibility = "hidden";
     state.query = e.currentTarget.elements.query.value.trim();
     if(!state.query){
         return
     }
     getPictures(state.query, state.page)
     .then(({data: {hits}}) => {
         console.log(state.query);
      refs.gallery.innerHTML = cardTemplate(hits);
      if(hits.length > 11){
        refs.loadMoreBtn.style.visibility = "visible";
    }
    }); 
 }
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}
 const observer = new IntersectionObserver(onLoadMore, options)

 
 function onLoadMore() {
    state.page += 1 ;
    getPictures(state.query, state.page).then(({data: {hits}}) => {
        refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits));
        refs.gallery.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
          if(hits.length < 12){
            refs.loadMoreBtn.style.visibility = "hidden";
        }
        if(state.page === 2){
            observer.observe(refs.loadMoreBtn)
        }
 })}
 
 function openModal(e) {
     if(e.target.nodeName !== 'IMG'){
         return
     }
     const instance = basicLightbox.create(`
     <img src="${e.target.dataset.src}" width="800" height="600">
 `)
    instance.show()
 }
 
 

