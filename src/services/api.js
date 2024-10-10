import axios from "axios";

//URL api: https://api.themoviedb.org/3/movie/now_playing?api_key=1203ab361bd84b858ab9e8b63b27f849&language=pt-BR
//Base do URL: https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;