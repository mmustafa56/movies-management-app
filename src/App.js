import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Movies from "./components/Movies";
import Login from "./components/Login";
import Registration from "./components/Registeration";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./components/Home";
import FavoriteMovies from "./components/FavoriteMovies";

function App() {
  const isAuthenticated =
    useSelector((state) => state.user.isAuthenticated) || false;

  // const PublicRoute = () => {
  //   if (isAuthenticated) {
  //     return <Navigate to={"/"} replace />;
  //   }
  //   return <Outlet />;
  // };

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
          {/* Public Routes */}
          {/* <Route path="/" element={<PublicRoute />}> */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            {/* Movies also available in Public Routes */}
            <Route path="/movies" element={<Movies />} />
          {/* </Route> */}

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/movies/favorite" element={<FavoriteMovies />} />
            {/* <Route path="/movies" element={<Movies />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
