import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const  token = localStorage.getItem("token");
  // console.log(token)
  // const isAuthenticated = useSelector(state => state.user.isAuthenticated)


  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8000/apis/movies/favorite-movies`);
      setMovies((prevMovies) => [...prevMovies, ...(response.data.results || [])]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);



return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Favorite Movies</h1>
       
        <div>
          <div className="flex ">
            <button
              className={`px-4 py-2 ${viewMode === "grid" ? "bg-green-800 text-white" : "bg-gray-200 text-gray-800"} rounded`}
              onClick={() => setViewMode("grid")}
            >
              Grid View
            </button>
            <button
              className={`px-4 py-2 ${viewMode === "list" ? "bg-green-800 text-white" : "bg-gray-200 text-gray-800"} rounded`}
              onClick={() => setViewMode("list")}
            >
              List View
            </button>
          </div>
        </div>

      </div>

      <div className={`${viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-4 py-5" : "flex flex-col "}`}>
        {movies.map((movie, index) => (
          <Link to={`/movie/${movie.trackId}`} key={index} className="h-full my-1">
            <div className="border p-4 pb-16 rounded shadow hover:shadow-lg transition h-[60vh] flex flex-col justify-between">
              <img
                src={movie.artworkUrl100}
                alt={movie.trackName}
                className="w-full h-3/4 object-cover mb-2 rounded"
              />
              <div className="flex justify-between align-middle  lg:mt-6">
                <div>
                  <h3 className="sm:font-normal font-semibold">{movie.trackName}</h3>
                  <p className="text-sm text-gray-600">{movie.primaryGenreName}</p>
                  <p className="text-sm font-semibold text-gray-800">
                    Price: ${movie.trackPrice || "N/A"}
                  </p>
                </div>
                <div className="">
                {/* {isAuthenticated&& */}
                  <button
                    className="bg-slate-400 rounded-full px-1 flex justify-center align-middle hover:shadow-2xl hover:bg-slate-700 hover:shadow-slate-500"
                    // onClick={(e) => handleAddToFavorite(movie, e)}
                  >
                   <i className={`bi bi-heart-fill text-red-700`}></i>
                  </button>
                {/* }  */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div  className="mt-4 flex justify-center items-center h-12">
        {isLoading && (
          <>
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent border-t-4 rounded-full animate-spin me-1"></div>loading...
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// const FavoriteMovies = () => {
//   const [movies, setMovies] = useState([]);
//   const [viewMode, setViewMode] = useState("grid");
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const token = localStorage.getItem("token");

//   const itemsPerPage = 10;

//   // Function to fetch movies based on page
//   const fetchMovies = async (pageNumber) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`http://localhost:8000/apis/movies/favorite-movies?page=${pageNumber}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // assuming you need to pass a token for authentication
//         },
//       });

//       if (response.data.results) {
//         setMovies((prevMovies) => [...prevMovies, ...response.data.results]);

//         if (response.data.results.length < itemsPerPage) {
//           setHasMore(false);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       toast.error("Error fetching movies!");
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
//         if (entry.isIntersecting && !isLoading && hasMore) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       },
//       { threshold: 1.0 }
//     );

//     const lastElement = document.querySelector("#last-element");
//     if (lastElement) {
//       observer.observe(lastElement);
//     }

//     return () => {
//       if (lastElement) {
//         observer.unobserve(lastElement);
//       }
//     };
//   }, [isLoading, hasMore]);

//   const handleAddToFavorite = async (movie) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/apis/movies/add-to-favorite",
//         { movieId: movie.trackId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Movie added to favorites!");
//     } catch (error) {
//       toast.error("Failed to add movie to favorites.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Favorite Movies</h1>

//         <div className="flex">
//           <button
//             className={`px-4 py-2 ${viewMode === "grid" ? "bg-green-800 text-white" : "bg-gray-200 text-gray-800"} rounded`}
//             onClick={() => setViewMode("grid")}
//           >
//             Grid View
//           </button>
//           <button
//             className={`px-4 py-2 ${viewMode === "list" ? "bg-green-800 text-white" : "bg-gray-200 text-gray-800"} rounded`}
//             onClick={() => setViewMode("list")}
//           >
//             List View
//           </button>
//         </div>
//       </div>

//       <div className={`${viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-4 py-5" : "flex flex-col "}`}>
//         {movies.map((movie, index) => (
//           <Link to={`/movie/${movie.trackId}`} key={movie.trackId} className="h-full my-1">
//             <div className="border p-4 pb-16 rounded shadow hover:shadow-lg transition h-[60vh] flex flex-col justify-between">
//               <img
//                 src={movie.artworkUrl100}
//                 alt={movie.trackName}
//                 className="w-full h-3/4 object-cover mb-2 rounded"
//               />
//               <div className="flex justify-between align-middle lg:mt-6">
//                 <div>
//                   <h3 className="sm:font-normal font-semibold">{movie.trackName}</h3>
//                   <p className="text-sm text-gray-600">{movie.primaryGenreName}</p>
//                   <p className="text-sm font-semibold text-gray-800">
//                     Price: ${movie.trackPrice || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <button
//                     className="bg-slate-400 rounded-full px-1 flex justify-center align-middle hover:shadow-2xl hover:bg-slate-700 hover:shadow-slate-500"
//                     onClick={() => handleAddToFavorite(movie)}
//                   >
//                     <i className="bi bi-heart-fill text-red-700"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <div id="last-element" className="mt-4 flex justify-center items-center h-12">
//         {isLoading && (
//           <div className="w-6 h-6 border-4 border-green-500 border-t-transparent border-t-4 rounded-full animate-spin me-1"></div>
//         )}
//         {isLoading && <span>Loading...</span>}
//         {!hasMore && !isLoading && <span>No more movies to load</span>}
//       </div>
//     </div>
//   );
// };

// export default FavoriteMovies;
