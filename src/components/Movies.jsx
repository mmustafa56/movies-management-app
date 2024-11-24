import React, { useEffect, useState } from "react";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://itunes.apple.com/search?term=star&country=au&media=movie");
      setMovies(response.data.results);
      console.log(response)
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie,index) => (
          <li key={movie.trackId} style={{textDecoration:"none"}}>
            <img src={movie.artworkUrl100} alt={movie.trackName} />
            <p>

              <strong>{movie.trackName} {index+1}</strong> - {movie.primaryGenreName}
            </p>
            <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

