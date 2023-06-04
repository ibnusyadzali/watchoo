import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByGenreAction } from "../stores/actionCreator";
import { Link, useParams } from "react-router-dom";
import NoPicture from "../asset/Sorry... there's no image yet (.png";

const Home = () => {
  const { genreId, genre } = useParams();
  const { moviesByGenre } = useSelector((state) => state.moviesByGenre);
  const dispatcher = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMoviesByGenre = (page) => {
    try {
      dispatcher(fetchMoviesByGenreAction(genreId, page));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [genreId]);

  useEffect(() => {
    fetchMoviesByGenre(currentPage);
  }, [currentPage, genreId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = moviesByGenre?.total_pages || 0;
  const pageSetSize = 5;
  const totalPageSets = Math.ceil(totalPages / pageSetSize);
  const currentPageSet = Math.ceil(currentPage / pageSetSize);

  const getPageNumbersForSet = (setNumber) => {
    const startPage = (setNumber - 1) * pageSetSize + 1;
    const endPage = Math.min(setNumber * pageSetSize, totalPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-white to-gray-300 text-black flex justify-center overflow-auto">
      <div className="p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8 pt-16">
          <p className="text-lg md:text-2xl lg:text-4xl text-gray-800 font-bold inline border-b-2 border-opacity-60 border-gray-500">Movie list with genre: {genre}</p>
        </div>
        <div className="grid grid-cols-2 text-xs md:grid-cols-4 lg:grid-cols-5 gap-8 md:px-12 lg:text-base">
          {moviesByGenre && moviesByGenre.results ? (
            moviesByGenre.results.length !== 0 ? (
              moviesByGenre.results.map((el, i) => (
                <Link key={el.id} to={`/detail/${el.title}/${el.id}`} className="shadow-md shadow-gray-600 rounded-lg flex flex-col">
                  {el.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt="" className="mt-1 rounded-md duration-200 hover:scale-105" />
                  ) : (
                    <img src={NoPicture} alt="" className="mt-1 rounded-md duration-200 hover:scale-105" />
                  )}
                  <div className="flex flex-col">
                    <p className="mt-4 px-2 text-gray-800 font-bold">{el.title}</p>
                    <p className="px-2 text-gray-400 font-bold">{el.release_date.slice(0, 4)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="h-screen w-full">
                <h2>Movies not found.</h2>
              </div>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-3 py-2 mx-1 rounded-lg ${currentPage === 1 ? "bg-gray-300 text-gray-800 cursor-not-allowed" : "bg-gray-300 text-gray-800 hover:bg-indigo-500 hover:text-white"}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {getPageNumbersForSet(currentPageSet).map((page) => (
              <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-2 mx-1 rounded-lg ${page === currentPage ? "bg-indigo-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-indigo-500 hover:text-white"}`}>
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-3 py-2 mx-1 rounded-lg ${currentPage === totalPages ? "bg-gray-300 text-gray-800 cursor-not-allowed" : "bg-gray-300 text-gray-800 hover:bg-indigo-500 hover:text-white"}`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
