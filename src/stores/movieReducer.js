import { MOVIE_GET_TRENDING, MOVIE_GET_MOVIE_DETAIL, MOVIE_GET_ALL_GENRES, MOVIE_GET_SEARCH_MOVIES, MOVIE_GET_MOVIES_BY_GENRE } from "./actionType";

const initialState = {
    trendingMovie: {},
    movieDetail: {},
    movieGenre: [],
    searchMovies: {},
    moviesByGenre: {}
}

const movieReducers = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_GET_TRENDING:
            return {
                ...state,
                trendingMovie: action.payload
            }
        case MOVIE_GET_MOVIE_DETAIL:
            return {
                ...state,
                movieDetail: action.payload
            }
        case MOVIE_GET_ALL_GENRES:
            return {
                ...state,
                movieGenre: action.payload
            }
        case MOVIE_GET_MOVIES_BY_GENRE:
            return {
                ...state,
                moviesByGenre: action.payload
            }
        case MOVIE_GET_SEARCH_MOVIES:
            return {
                ...state,
                searchMovies: action.payload
            }
        default:
            return state
    }
}

export default movieReducers