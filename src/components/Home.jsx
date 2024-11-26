
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieFunc = async () => {
      const response = await axios.get(
        "https://itunes.apple.com/search?term=star&country=au&media=movie&limit=12"
      );
      setMovies(response.data.results);
    };
    movieFunc();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 movies per slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Medium screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Small screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Extra small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <main className="mx-auto max-w-6xl">
        {/* Hero Section with Carousel */}
        <section
          id="movies-hero"
          className="widescreen:section-min-height tallscreen:section-min-height mb-12 p-6"
        >
          <h2 className="text-center text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl mb-6">
            Discover the World of Movies
          </h2>

          {movies.length > 0 ? (
            <Slider {...sliderSettings}>
              {movies.map((movie) => (
                <div key={movie.trackId} className="p-2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden text-center">
                    <img
                      src={movie.artworkUrl100.replace("100x100", "300x300")}
                      alt={movie.trackName}
                      className="w-full"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                      {movie.trackName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Genre: {movie.primaryGenreName}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Release Date: {new Date(movie.releaseDate).toDateString()}
                    </p>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                      {movie.longDescription
                        ? movie.longDescription.slice(0, 100) + "..."
                        : "No description available."}
                    </p>
                    <p className="mt-2 text-sm font-bold text-teal-600 dark:text-teal-400">
                      Rating: {movie.contentAdvisoryRating || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-2xl text-slate-700 dark:text-slate-400">
              Loading movies...
            </p>
          )}
        </section>

        <hr className="mx-auto w-1/2 bg-black dark:bg-white" />

        {/* Famous Movie Quotes Section */}
        <section
          id="movie-quotes"
          className="widescreen:section-min-height tallscreen:section-min-height my-12 p-6"
        >
          <h2 className="mb-6 text-center text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Famous Movie Quotes
          </h2>
          <ul className="space-y-6">
            <li className="bg-teal-600 p-6 text-white rounded-xl shadow-lg">
              <p className="text-xl">
                "Here's looking at you, kid." – *Casablanca (1942)*
              </p>
            </li>
            <li className="bg-teal-600 p-6 text-white rounded-xl shadow-lg">
              <p className="text-xl">
                "May the Force be with you." – *Star Wars (1977)*
              </p>
            </li>
            <li className="bg-teal-600 p-6 text-white rounded-xl shadow-lg">
              <p className="text-xl">
                "You talking to me?" – *Taxi Driver (1976)*
              </p>
            </li>
            <li className="bg-teal-600 p-6 text-white rounded-xl shadow-lg">
              <p className="text-xl">
                "Life is like a box of chocolates. You never know what you're
                gonna get." – *Forrest Gump (1994)*
              </p>
            </li>
          </ul>
        </section>

        <hr className="mx-auto w-1/2 bg-black dark:bg-white" />

        {/* Contact Section */}
        <section
          id="contact"
          className="widescreen:section-min-height tallscreen:section-min-height my-12 p-6"
        >
          <h2 className="mb-6 text-center text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Contact Us
          </h2>
          <form
            action=""
            className="items-left mx-auto flex max-w-4xl flex-col gap-4 text-2xl sm:text-3xl"
          >
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              minLength="3"
              maxLength="60"
              placeholder="Your Subject"
              className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
            />
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Your Message"
              required
              className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
            ></textarea>
            <button className="w-48 rounded-xl border border-solid border-slate-900 bg-teal-700 p-3 text-white hover:bg-teal-600 active:bg-teal-500 dark:border-none">
              Submit
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-teal-700 text-xl text-white">
        <div className="flex flex-col sm:gap-2 p-4">
          <p className="text-center">
            Copyright &copy; <span id="year">2024</span> All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
