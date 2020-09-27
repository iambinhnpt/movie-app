import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?api_key=21a033efad5bde562a70333aacb2dce5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=21a033efad5bde562a70333aacb2dce5&query=";

function App() {
  const [movies, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data.results);
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data.results);
      });
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;
