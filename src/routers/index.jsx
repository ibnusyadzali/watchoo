import {createBrowserRouter} from "react-router-dom"
import BaseLayout from "../layouts/BaseLayout"
import Home from "../views/Home"
import SearchMovie from "../views/SearchMovie"
import MovieDetail from "../views/MovieDetail"
import MoviesByGenre from "../views/MoviesByGenre"

const router = createBrowserRouter([
    {
        element: <BaseLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/search/:query",
                element: <SearchMovie/>
            },
            {
                path: "/:genreId/:genre",
                element: <MoviesByGenre/>
            },
            {
                path: "/detail/:title/:id",
                element: <MovieDetail/>
            },
        ]
    }
])

export default router