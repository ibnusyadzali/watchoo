import { MOVIE_GET_TRENDING, MOVIE_GET_MOVIE_DETAIL, MOVIE_GET_ALL_GENRES, MOVIE_GET_SEARCH_MOVIES, MOVIE_GET_MOVIES_BY_GENRE } from "./actionType";
const apikey= 'api_key=c90b508aedff35368a70523c80125220'
const url = 'https://api.themoviedb.org/3/'

export const getTrending = (payload) => {
  return {
    type: MOVIE_GET_TRENDING,
    payload,
  };
};
export const getMovieDetail = (payload) => {
  return {
    type: MOVIE_GET_MOVIE_DETAIL,
    payload,
  };
};
export const getMovieGenres = (payload) => {
  return {
    type: MOVIE_GET_ALL_GENRES,
    payload,
  };
};
export const getSearchMovies = (payload) => {
  return {
    type: MOVIE_GET_SEARCH_MOVIES,
    payload,
  };
};
export const getMoviesByGenre = (payload) => {
  return {
    type: MOVIE_GET_MOVIES_BY_GENRE,
    payload,
  };
};

export const fetchTrendingAction = (page) => {
  return async (dispatcher) => {
    try {
      const res = await fetch(`${url}trending/movie/day?${apikey}&page=${page}`);
      const data = await res.json();
      
      dispatcher(getTrending(data));
    } catch (error) {
      throw error;
    }
  };
};

export const fetchMovieDetailAction = (id) => {
  return async (dispatcher) => {
    try {
      const res = await fetch(`${url}movie/${id}?${apikey}`);
      const data = await res.json();

      dispatcher(getMovieDetail(data));
    } catch (error) {
      throw error;
    }
  };
};
export const fetchMovieGenresAction = () => {
  return async (dispatcher) => {
    try {
      const res = await fetch(`${url}genre/movie/list?${apikey}`);
      const data = await res.json();

      dispatcher(getMovieGenres(data.genres));
    } catch (error) {
      throw error;
    }
  };
};
export const fetchMoviesByGenreAction = (genreId,page) => {
  return async (dispatcher) => {
    try {
      const res = await fetch(`${url}discover/movie?${apikey}&with_genres=${genreId}&page=${page}`);
      const data = await res.json();

      dispatcher(getMoviesByGenre(data));
    } catch (error) {
      throw error;
    }
  };
};
export const fetchSearchMoviesAction = (query, page) => {
  return async (dispatcher) => {
    try {
      const res = await fetch(`${url}search/movie?${apikey}&query=${query}&page=${page}`);
      const data = await res.json();

      dispatcher(getSearchMovies(data));
    } catch (error) {
      throw error;
    }
  };
};
