import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Movies from "./components/Movies";
import Login from "./components/Login";
import Registration from "./components/Registeration";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import FavoriteMovies from "./components/FavoriteMovies";
import Movie from "./components/Movie";
import "./index.css";

function App() {
  const isAuthenticated =
    useSelector((state) => state.user.isAuthenticated) || false;

  const PrivateRoute = () => {
    if (!isAuthenticated) {
      return <Navigate to={"/login"} replace />;
    }
    return <Outlet />;
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:trackId" element={<Movie />} />
            <Route path="/" element={<PrivateRoute />}>
               <Route path="/movies/favorite" element={<FavoriteMovies />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
