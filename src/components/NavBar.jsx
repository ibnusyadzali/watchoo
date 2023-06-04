import Logo from "../asset/watchoo-navbrand.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieGenresAction, fetchSearchMoviesAction } from "../stores/actionCreator";

const NavBar = () => {
  const navigate = useNavigate();
  const input = {
    query: "",
  };

  const [values, setValues] = useState(input);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (values.query) {
        await dispatcher(fetchSearchMoviesAction(values.query, 1));
        navigate(`/search/${values.query}`);
        setValues({ query: "" });
        if (nav) {
          setNav(!nav);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [nav, setNav] = useState(false);
  const [categories, setCategories] = useState(false);
  const [categories2, setCategories2] = useState(false);
  const { movieGenre } = useSelector((state) => state.movieGenre);
  const dispatcher = useDispatch();
  const categoriesRef = useRef(null);
  const categoriesButtonRef = useRef(null);
  const categoriesRef2 = useRef(null);
  const categoriesButtonRef2 = useRef(null);

  const fetchGenre = () => {
    try {
      dispatcher(fetchMovieGenresAction());
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = () => {
    if (!categories) {
      setCategories(true);
    } 
    else {
      setCategories(false)
    }
  };
  const handleCategoryClick2 = () => {
    if (!categories2) {
      setCategories2(true);
    } else {
      setCategories2(false)
    }
  };

  const handleGenreClick2 = () => {
      setCategories2(false)
      setNav(false)
  };

  const handleHomeClick = () => {
    navigate("/");
    setNav(!nav);
  };

  useEffect(() => {
    fetchGenre();
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target) && !categoriesButtonRef.current.contains(event.target)) {
          setCategories(false);
      }
      if (categoriesRef2.current && !categoriesRef2.current.contains(event.target) && !categoriesButtonRef2.current.contains(event.target)) {
          setCategories2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center w-full h-14 fixed bg-white shadow-lg px-4 z-[600]">
        <div className="w-40">
          <img src={Logo} alt="" className="w-full" />
        </div>

        <ul className="hidden md:flex">
          <li className="px-4 cursor-pointer font-medium text-gray-800 hover:scale-105 hover:text-gray-500 duration-200">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 cursor-pointer font-medium text-gray-800 hover:scale-105 hover:text-gray-500 duration-200">
            <p onClick={handleCategoryClick} ref={categoriesButtonRef} className="group flex flex-row">
              Categories
              <span className="group-hover:rotate-90 duration-300">
                <MdOutlineKeyboardArrowRight size={25} className="ml-1" />
              </span>
            </p>
          </li>
        </ul>
        <form onSubmit={handleSubmit} className="w-1/2 hidden md:flex">
          <input
            type="text"
            name="query"
            onChange={handleInputChange}
            value={values.query}
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search movie title here"
          />
          <button className="px-4 text-white bg-purple-600 rounded-full ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-800 md:hidden">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        {nav && (
          <div className="mt-14 pt-8 flex md:hidden flex-col justify-start items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-gray-400 text-gray-800">
            <form onSubmit={handleSubmit} className="w-5/6 flex flex-row mb-4">
              <input
                type="text"
                name="query"
                onChange={handleInputChange}
                value={values.query}
                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search movie title here"
              />
              <button className="px-4 text-white bg-purple-600 rounded-full ">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            <button
              onClick={handleHomeClick}
              className="py-2 w-5/6 rounded-full bg-gradient-to-b from-white to-gray-400 text-indigo-700 hover:text-indigo-500 border border-indigo-700 hover:border-indigo-500 duration-300 font-semibold text-center text-lg"
            >
              Home
            </button>
            <p
              onClick={handleCategoryClick2}
              ref={categoriesButtonRef2}
              className="cursor-pointer py-2 my-4 w-5/6 rounded-full text-lg bg-gradient-to-b from-white to-gray-400 text-indigo-700 hover:text-indigo-500 border border-indigo-700 hover:border-indigo-500 duration-300 font-semibold text-center"
            >
              Categories
            </p>
            {categories2 && (
              <div className="w-full flex justify-center">
                <div ref={categoriesRef2} className=" w-9/12 h-auto rounded-lg mt-4 fixed flex justify-center items-center flex-col">
                  {movieGenre.slice(0, Math.ceil(movieGenre.length / 3)).map((el1, i) => {
                    return (
                      <ul key={i} className="flex w-full gap-2 justify-around items-center py-2">
                        {movieGenre.slice(i * 3, i * 3 + 3)?.map((el2, i) => {
                          return (
                            <Link
                              to={`/${el2.id}/${el2.name}`}
                              key={el2.id}
                              className="py-2 px-2 my-1 mx-auto rounded-full text-sm bg-gradient-to-b from-white to-gray-400 text-indigo-700 hover:text-indigo-500 border border-indigo-700 hover:border-indigo-500 duration-300 w-1/3 font-semibold text-center"
                              onClick={handleGenreClick2}
                            >
                              {el2.name}
                            </Link>
                          );
                        })}
                      </ul>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {categories && (
        <div className="w-full hidden md:flex justify-center">
          <div ref={categoriesRef} className="w-full h-auto rounded-lg px-4 top-16 fixed z-[500] bg-gradient-to-b from-gray-300 to-gray-100 flex justify-center items-center flex-col">
            {movieGenre.slice(0, Math.ceil(movieGenre.length / 5)).map((el1, i) => {
              return (
                <ul key={i} className="flex gap-8 w-11/12 justify-around items-center py-2">
                  {movieGenre.slice(i * 5, i * 5 + 5)?.map((el2, i) => {
                    return (
                      <Link
                        to={`/${el2.id}/${el2.name}`}
                        key={el2.id}
                        className="py-2 px-2 my-1 w-full rounded-full text-sm bg-gradient-to-b from-white to-gray-400 text-indigo-700 hover:text-indigo-500 border border-indigo-700 hover:border-indigo-500 hover:scale-105 duration-300 font-semibold text-center"
                        onClick={handleCategoryClick}
                      >
                        {el2.name}
                      </Link>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
