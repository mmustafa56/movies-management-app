// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ReactPlayer from 'react-player/lazy'

// const Movie = () => {

// const {trackId} = useParams();
// const [movies,setMovies] = useState([]);

// const movieFunc = async() => {
//    const movieRes = await axios.get("https://itunes.apple.com/search?term=star&country=au&media=movie&all");
//      setMovies(movieRes.data.results)
// }

// useEffect(()=>{
//    movieFunc();
// },[])

// const  movieFilter = movies.filter((movie)=>movie.trackId == trackId)


// console.log(movieFilter)
//   return (
//     <div className="w-full h-3/6">
//       <ReactPlayer
//        url = {`${movieFilter[0]?.previewUrl}`}
//        playing = {true}
//        loop = {false}
//        volume = {true}
//        controls = {true}
//        muted = {true}
//        progressInterval = {false}
//        config={{ file: {
//         tracks: [
//           {kind: 'subtitles', src: 'subs/subtitles.en.vtt', srcLang: 'en', default: true},
//           {kind: 'subtitles', src: 'subs/subtitles.ja.vtt', srcLang: 'ja'},
//           {kind: 'subtitles', src: 'subs/subtitles.de.vtt', srcLang: 'de'}
//         ]
//       }}}
//        className=''
//        width='70%'
//        height='70%'
//        />
//     </div>
//   )
// }

// export default Movie
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';

const Movie = () => {
  const { trackId } = useParams();
  const [movies, setMovies] = useState([]);

  // Fetch movie data
  const movieFunc = async () => {
    const movieRes = await axios.get(
      "https://itunes.apple.com/search?term=star&country=au&media=movie&all"
    );
    setMovies(movieRes.data.results);
  };

  useEffect(() => {
    movieFunc();
  }, []);

  // Filter the movie by trackId
  const movieFilter = movies.filter((movie) => movie.trackId === parseInt(trackId));
  const previewUrl = movieFilter[0]?.previewUrl;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900">
      {previewUrl ? (
        <div className="w-full max-w-4xl p-4">
          <ReactPlayer
            url={previewUrl}
            playing={true}
            loop={false}
            volume={0.8} // Adjust volume level here
            controls={true}
            muted={false}
            progressInterval={200}
            config={{
              file: {
                tracks: [
                  {
                    kind: 'subtitles',
                    src: 'subs/subtitles.en.vtt',
                    srcLang: 'en',
                    default: true,
                  },
                  {
                    kind: 'subtitles',
                    src: 'subs/subtitles.ja.vtt',
                    srcLang: 'ja',
                  },
                  {
                    kind: 'subtitles',
                    src: 'subs/subtitles.de.vtt',
                    srcLang: 'de',
                  },
                ],
              },
            }}
            width="100%" // Adjust for responsiveness
            height="auto"
            className="react-player rounded-lg shadow-xl"
          />
        </div>
      ) : (
        <div className="w-full text-center text-white">
          <p>No trailer available for this movie.</p>
          <img
            src="https://via.placeholder.com/600x400?text=No+Trailer+Available"
            alt="No Trailer Available"
            className="mx-auto mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default Movie;
