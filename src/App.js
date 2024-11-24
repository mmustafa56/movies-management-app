import { BrowserRouter ,Route,Routes, Outlet,Navigate} from 'react-router-dom';
import Movies from './components/Movies';
import Login from './components/Login';
import Registration from './components/Registeration';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import './index.css';



function App() {
const isAuthenticated = useSelector(state => state.user.isAuthenticated) || false

const PublicRoute =()=>{
  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
}


const PrivateRoute =()=>{
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet/>
}

  return (
    <>
     <BrowserRouter>
          <Navbar/>
        <Routes>
         <Route path="/" element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/movies" element={<Movies />} />
          </Route>
          <Route path='/' element={<PrivateRoute/>}>
            <Route path="/movies/favorite" element={<Movies />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
