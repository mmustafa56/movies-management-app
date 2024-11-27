import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/userSlice';
import { toast } from 'react-toastify';
import logoImg from '../images/logo.png';
import { useState } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("User Logout successfully!");
    navigate("/"); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 bg-teal-700 text-white">
      <section className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <h1 className="text-3xl font-medium">
          <Link to="/">
            <img src={logoImg} alt="Logo" className="w-14 h-14 rounded-full" />
          </Link>
        </h1>
        
        <div>
          <button 
            id="hamburger-button" 
            className={`relative h-8 w-8 cursor-pointer text-3xl md:hidden ${isMenuOpen ? 'toggle-btn' : ''}`} 
            onClick={toggleMenu}
          >
            <div className="absolute top-4 -mt-0.5 h-1 w-8 rounded bg-white transition-all duration-500 before:absolute before:h-1 before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded before:bg-white before:transition-all before:duration-500 before:content-[''] after:absolute after:h-1 after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded after:bg-white after:transition-all after:duration-500 after:content-['']"></div>
          </button>

          <nav className="hidden space-x-8 text-xl md:block" aria-label="main">
            <Link to="/" className="hover:opacity-90">Home</Link>
            <Link to="/movies" className="hover:opacity-90" onClick={closeMenu}>Movies</Link>
            {isAuthenticated && <Link to="/movies/favorite" className="hover:opacity-90" onClick={closeMenu}>Favorite Movies</Link>}
            
            {isAuthenticated ? (
              <Link to="/" onClick={() => { handleLogout(); closeMenu(); }} className="hover:opacity-90">Logout</Link>
            ) : (
              <Link to="/login" className="hover:opacity-90" onClick={closeMenu}>Login</Link>
            )}
          </nav>
        </div>
      </section>

      <section id="mobile-menu" className={`top-68 justify-center absolute w-full origin-top animate-open-menu ${isMenuOpen ? 'flex' : 'hidden'} flex-col bg-black text-5xl`}>
        <nav className="flex min-h-screen flex-col items-center py-8" aria-label="mobile">
          <Link to="/" className="w-full py-6 text-center hover:opacity-90" onClick={closeMenu}>Home</Link>
          <Link to="/movies" className="w-full py-6 text-center hover:opacity-90" onClick={closeMenu}>Movies</Link>
          {isAuthenticated && <Link to="/movies/favorite" className="w-full py-6 text-center hover:opacity-90" onClick={closeMenu}>Favorite Movies</Link>}
          
          {isAuthenticated ? (
            <Link to="/" onClick={() => { handleLogout(); closeMenu(); }} className="w-full py-6 text-center hover:opacity-90">Logout</Link>
          ) : (
            <Link to="/login" className="w-full py-6 text-center hover:opacity-90" onClick={closeMenu}>Login</Link>
          )}
        </nav>
      </section>
    </header>
  );
};

export default Navbar;

