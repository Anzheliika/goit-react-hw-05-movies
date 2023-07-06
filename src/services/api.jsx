import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '1af6aa3b66a06628ab2e4f0b1f9b28f5';

export async function getTrendMovies() {
  const response = await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}`
  );

  return response.data.results;
}

export async function searchMovies(query) {
  const response = await axios.get(
    `${BASE_URL}search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
  );

  return response.data.results;
}

export async function getMovieDetails(id) {
  const response = await axios.get(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  return response.data;
}

export async function getMovieCast(id) {
  const response = await axios.get(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );

  return response.data;
}

export async function getMovieReviews(id) {
  const response = await axios.get(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );

  return response.data.results;
}
