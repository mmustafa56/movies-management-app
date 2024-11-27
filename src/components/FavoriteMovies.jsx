
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem("token");

  const fetchMovies = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        "http://localhost:8000/apis/movies/favorite-movies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovies(response.data?.data || []); // Set movies if data exists
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Favorite Movies</h1>
        <div className="flex">
          <button
            className={`px-4 py-2 ${
              viewMode === "grid"
                ? "bg-green-800 text-white"
                : "bg-gray-200 text-gray-800"
            } rounded`}
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 ${
              viewMode === "list"
                ? "bg-green-800 text-white"
                : "bg-gray-200 text-gray-800"
            } rounded`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-7 h-7 border-4 border-green-500 border-t-transparent rounded-full animate-spin mr-1"></div>loading...
        </div>
      ) : movies.length > 0 ? (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-2 md:grid-cols-4 gap-4 py-5"
              : "flex flex-col"
          }`}
        >
          {movies.map((movie, index) => (
            <Link
              to={`/movie/${movie.trackId}`}
              key={index}
              className="h-full my-1"
            >
              <div className="border p-4 pb-16 rounded shadow hover:shadow-lg transition h-[60vh] flex flex-col justify-between">
                <img
                  src={movie.artworkUrl100}
                  alt={movie.trackName}
                  className="w-full h-3/4 object-cover mb-2 rounded"
                />
                <div className="flex justify-between items-center lg:mt-6">
                  <div>
                    <h3 className="sm:font-normal font-semibold">
                      {movie.trackName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {movie.primaryGenreName}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      Price: ${movie.trackPrice || "N/A"}
                    </p>
                  </div>
                  <button
                    disabled={true}
                    className="bg-slate-400 rounded-full px-1 flex justify-center items-center hover:shadow-2xl hover:bg-slate-700 hover:shadow-slate-500"
                  >
                    <i className="bi bi-heart-fill text-slate-700"></i>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          No favorite movies found.
        </p>
      )}
    </div>
  );
};

export default FavoriteMovies;
