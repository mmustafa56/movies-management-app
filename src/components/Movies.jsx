import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [page, setPage] = useState(1); // Current page for infinite scroll
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const observerRef = useRef(null); // Ref for observing the bottom of the list

  const itemsPerPage = 10;

  const fetchMovies = async (pageNumber) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://itunes.apple.com/search?term=star&country=au&media=movie&limit=${itemsPerPage}&offset=${(pageNumber - 1) * itemsPerPage}`
      );
      setMovies((prevMovies) => [...prevMovies, ...(response.data.results || [])]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1); // Load the next page
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Movies</h1>
        <div>
          <button
            className={`px-4 py-2 mr-2 ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } rounded`}
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } rounded`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className={`${
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-4 gap-4"
            : "flex flex-col "
        }`}
      >
        {movies.map((movie, index) => (
          <Link to={`/movie/${movie.trackId}`}>
            <div
              key={`${movie.trackId}-${index}`}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={movie.artworkUrl100}
                alt={movie.trackName}
                className="w-full h-3/4 mb-2"
              />
              <h3 className="font-semibold text-lg mb-1">{movie.trackName}</h3>
              <p className="text-sm text-gray-600">{movie.primaryGenreName}</p>
              <p className="text-sm font-semibold text-gray-800">
                Price: ${movie.trackPrice || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div ref={observerRef} className="mt-4 flex justify-center items-center h-12">
        {isLoading && <span className="text-gray-700">Loading more movies...</span>}
      </div>
    </div>
  );
};

export default Movies;
