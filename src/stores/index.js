import { applyMiddleware, legacy_createStore as createStore, combineReducers} from "redux"
import thunk from "redux-thunk"
import movieReducer from "./movieReducer"

const  rootReducer = combineReducers({
    trendingMovie : movieReducer,
    movieDetail: movieReducer,
    movieGenre: movieReducer,
    searchMovies: movieReducer,
    moviesByGenre: movieReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store