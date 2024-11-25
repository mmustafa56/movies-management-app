import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const itemsPerPage = 10;

  const fetchMovies = async (pageNumber) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://itunes.apple.com/search?term=star&country=au&media=movie&limit=${itemsPerPage}&offset=${(pageNumber - 1) * itemsPerPage}`);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
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
            className={`px-4 py-2 mr-2 ${viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
              } rounded`}
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 ${viewMode === "list"
                ? "bg-green-800 text-white"
                : "bg-gray-200 text-gray-800"
              } rounded`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className={`${viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-4" : "flex flex-col "}`}>
        {movies.map((movie, index) => (
          <Link to={`/movie/${movie.trackId}`} key={index} className="h-full my-5">
            <div className="border p-4 rounded shadow hover:shadow-lg transition h-[60vh] flex flex-col justify-between">
              <img
                src={movie.artworkUrl100}
                alt={movie.trackName}
                className="w-full h-3/4 object-cover mb-2 rounded"
              />
              <div className="flex justify-between align-middle">
                  <div>
                      <h3 className="sm:font-normal font-semibold">{movie.trackName}</h3>
                      <p className="text-sm text-gray-600">{movie.primaryGenreName}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        Price: ${movie.trackPrice || "N/A"}
                      </p>
                  </div>
                  <div className="">
                    <button className="bg-slate-400 rounded-full px-1 flex justify-center align-middle hover:shadow-2xl hover:bg-slate-700 hover:shadow-slate-500">
                       <i class="bi bi-heart-fill text-red-700"></i>
                    </button>
                  </div>
              </div>
            </div>

          </Link>
        ))}
      </div>


      <div ref={observerRef} className="mt-4 flex justify-center items-center h-12">
        {isLoading && (<>
          <div className="w-6 h-6 border-4 border-green-500 border-t-transparent border-t-4 rounded-full animate-spin me-1"></div>loading...
        </>
        )}
      </div>
    </div>
  );
};

export default Movies;





// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Movies = () => {
//   const [movies, setMovies] = useState([]);
//   const [viewMode, setViewMode] = useState("grid");
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const observerRef = useRef(null);

//   const itemsPerPage = 10;
//   const maxMovies = 50; 

//   const fetchMovies = async (pageNumber) => {
//     try {
//       if (movies.length >= maxMovies) return; 

//       setIsLoading(true);
//       const response = await axios.get(`https://itunes.apple.com/search?term=star&country=au&media=movie&limit=${itemsPerPage}&offset=${
//           (pageNumber - 1) * itemsPerPage
//         }`
//       );

//       const fetchedMovies = response.data.results || [];
//       setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMovies(page);
//   }, [page]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         if (entry.isIntersecting && !isLoading && movies.length < maxMovies) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (observerRef.current) observer.observe(observerRef.current);

//     return () => {
//       if (observerRef.current) observer.unobserve(observerRef.current);
//     };
//   }, [isLoading, movies]);

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Movies</h1>
//         <div>
//           <button
//             className={`px-4 py-2 mr-2 ${
//               viewMode === "grid"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-800"
//             } rounded`}
//             onClick={() => setViewMode("grid")}
//           >
//             Grid View
//           </button>
//           <button
//             className={`px-4 py-2 ${
//               viewMode === "list"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-800"
//             } rounded`}
//             onClick={() => setViewMode("list")}
//           >
//             List View
//           </button>
//         </div>
//       </div>

//       <div
//         className={`${
//           viewMode === "grid"
//             ? "grid grid-cols-2 md:grid-cols-4 gap-4"
//             : "flex flex-col"
//         }`}
//       >
//         {movies.map((movie, index) => (
//           <Link to={`/movie/${movie.trackId}`} key={index} className="h-full">
//             <div className="border p-4 rounded shadow hover:shadow-lg transition h-[50vh] flex flex-col justify-between">
//               <img
//                 src={movie.artworkUrl100}
//                 alt={movie.trackName}
//                 className="w-full h-[60%] object-cover mb-2 rounded"
//               />
//               <div>
//                 <h3 className="font-semibold text-lg mb-1">{movie.trackName}</h3>
//                 <p className="text-sm text-gray-600">{movie.primaryGenreName}</p>
//                 <p className="text-sm font-semibold text-gray-800">
//                   Price: ${movie.trackPrice || "N/A"}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <div ref={observerRef} className="mt-4 flex justify-center items-center h-12">
//         {isLoading && (
//           <>
//             <div className="w-6 h-6 border-4 border-green-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Movies;
