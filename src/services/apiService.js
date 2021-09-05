import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'
const keyApi = '23210508-f6b5f09e6f5a868a1633393ca'
export function getPictures(query, page){
    return axios.get(`&q=${query}&page=${page}&per_page=12&key=${keyApi}`)

}
