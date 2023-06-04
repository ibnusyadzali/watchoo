import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieDetailAction } from "../stores/actionCreator";
import NoPicture from "../asset/Sorry... there's no image yet (.png";

const MovieDetail = () => {
  const { id } = useParams();
  const { movieDetail } = useSelector((state) => state.movieDetail);
  const dispatcher = useDispatch();

  const fetchMovieDetail = async () => {
    try {
      await dispatcher(fetchMovieDetailAction(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);
  return (
    <div className="h-screen w-full bg-gradient-to-b from-white to-gray-300 text-gray-800 flex justify-center overflow-auto">
      {movieDetail ? (
        <div className="p-4 mx-auto flex flex-col justify-start w-full h-full">
          <div className="pb-8 mt-16 flex flex-col">
            <p className="text-4xl font-bold inline">{movieDetail.original_title}</p>
            <p className="text-md font-bold inline">{movieDetail.tagline}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {movieDetail.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt="" className="w-full rounded-md shadow-md shadow-gray-600" />
            ) : (
              <img src={NoPicture} alt="" className="w-full rounded-md shadow-md shadow-gray-600" />
            )}
            <div className="md:border-l-2 border-gray-500 border-opacity-50 border-inherit md:ml-4 text-gray-800 col-span-3 flex flex-row">
              <div className="mt-1 md:ml-2 text-sm md:text-base">
                <p className="mt-2">Released</p>
                <p className="mt-2">Rating</p>
                <p className="mt-2">Genres</p>
                <p className="mt-2">Languages</p>
                <p className="mt-2">Countries</p>
                <p className="mt-2">Companies</p>
                <p className="mt-2 hidden lg:flex">Overview</p>
              </div>
              <div className="mt-1 ml-2 text-sm md:text-base">
                <p className="mt-2">: {movieDetail.release_date}</p>
                <div className="mt-2">
                  : <span className="px-2 rounded-md text-md bg-gradient-to-b from-transparent to-gray-300 text-gray-800 duration-300 w-full">{movieDetail.vote_average?.toFixed(1)}</span>{" "}
                  <span className="ml-1 text-gray-400">
                    {"("}
                    {movieDetail.vote_count}
                    {" votes )"}
                  </span>
                </div>
                <div className="mt-2 flex flex-row">
                  :
                  {movieDetail.genres?.map((el, i) => {
                    return (
                      <p key={i} className="px-1 ml-1 rounded-md text-sm bg-gradient-to-b from-transparent to-gray-300 text-gray-800 duration-300 w-auto">
                        {el.name}
                      </p>
                    );
                  })}
                </div>
                <div className="mt-2 flex flex-row">
                  :
                  {movieDetail.spoken_languages?.map((el, i) => {
                    return (
                      <p key={i} className="px-1 ml-1 rounded-md text-sm bg-gradient-to-b from-transparent to-gray-300 text-gray-800 duration-300 w-auto">
                        {el.name}
                      </p>
                    );
                  })}
                </div>
                <div className="mt-2 flex flex-row">
                  :
                  {movieDetail.production_countries?.map((el, i) => {
                    return (
                      <p key={i} className="px-1 ml-1 rounded-md text-sm bg-gradient-to-b from-transparent to-gray-300 text-gray-800 duration-300 w-auto">
                        {el.name}
                      </p>
                    );
                  })}
                </div>
                <div className="mt-2 flex flex-row">
                  :
                  {movieDetail.production_companies?.map((el, i) => {
                    return (
                      <p key={i} className="px-1 ml-1 rounded-md text-sm bg-gradient-to-b from-transparent to-gray-300 text-gray-800 duration-300 w-auto">
                        {el.name}
                      </p>
                    );
                  })}
                </div>
                <div className="hidden mt-2 lg:flex flex-row text-gray-800">
                  <p className="mr-1">: </p>
                  <p className="font-semibold inline text-gray-500">{movieDetail.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-8 mt-4 flex flex-col text-gray-800 lg:hidden">
            <p className="text-2xl font-bold inline">Overview</p>
            <p className="font-semibold inline text-gray-500">{movieDetail.overview}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetail;
