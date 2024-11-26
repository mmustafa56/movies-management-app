import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';

const Movie = () => {
  const { trackId } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const movieFunc = async () => {
    const movieRes = await axios.get(
      "https://itunes.apple.com/search?term=star&country=au&media=movie&all"
    );
    setMovies(movieRes.data.results);
  };

  useEffect(() => {
    movieFunc();
  }, []);

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
            volume={0.8} 
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
            width="100%" 
            height="auto"
            className="react-player rounded-lg shadow-xl"
          />
          <div className='mt-2'>
              <button 
              onClick={()=>{navigate("/movies")}}
               className='bg-slate-200 text-black rounded-lg px-4 py-2 flex justify-center align-middle'
                >
              <i class="bi bi-arrow-left-short font-bold text-xl"></i>
                Back
              </button>

          </div>
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
