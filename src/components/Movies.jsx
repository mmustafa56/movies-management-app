import React, { useEffect, useState } from "react";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://itunes.apple.com/search?term=star&country=au&media=movie&all"
      );
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Movies</h1>
        <div>
          <button
            className={`px-4 py-2 mr-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} rounded`}
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} rounded`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-4 gap-4"
            : "flex flex-col"
        }`}
      >
        {currentMovies.map((movie) => (
          <div
            key={movie.trackId}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={movie.artworkUrl100}
              alt={movie.trackName}
              className="w-full h-auto mb-2"
            />
            <h3 className="font-semibold text-lg mb-1">{movie.trackName}</h3>
            <p className="text-sm text-gray-600">{movie.primaryGenreName}</p>
            <p className="text-sm font-semibold text-gray-800">
              Price: ${movie.trackPrice || "N/A"}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className={`px-4 py-2 ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white"
          } rounded`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-600 text-white"
          } rounded`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
