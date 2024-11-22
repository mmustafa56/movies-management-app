import { BrowserRouter ,Route,Routes,Link} from 'react-router-dom';
import './App.css';
import Movies from './components/Movies';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <nav>
          <Link to="/movies">Movies</Link>
        </nav>
        <Routes>
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
