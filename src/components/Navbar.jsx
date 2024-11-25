import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '../services/userSlice';
import { toast } from "react-toastify";
import logoImg from '../images/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state=> state.user?.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());  
    toast.info("User Logout  successfully!");        
    navigate("/");           
  };



  const initApp = () => {
    const hamburgerBtn = document.getElementById('hamburger-button')
    const mobileMenu = document.getElementById('mobile-menu')

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden')
        mobileMenu.classList.toggle('flex')
        hamburgerBtn.classList.toggle('toggle-btn')
    }

    hamburgerBtn.addEventListener('click', toggleMenu)
    mobileMenu.addEventListener('click', toggleMenu)
}

document.addEventListener('DOMContentLoaded', initApp)


  return (
    <header class="sticky top-0 z-10 bg-teal-700 text-white">
    <section class="mx-auto flex max-w-6xl items-center justify-between p-4">
      <h1 class="text-3xl font-medium">
        <Link to="/"> <img src={logoImg} alt="" className='w-20 h-20 rounded-full'/></Link>
      </h1>
      <div>
        <button id="hamburger-button" class="relative h-8 w-8 cursor-pointer text-3xl md:hidden">
          <div  class="absolute top-4 -mt-0.5 h-1 w-8 rounded bg-white transition-all duration-500 before:absolute before:h-1 before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded before:bg-white before:transition-all before:duration-500 before:content-[''] after:absolute after:h-1 after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded after:bg-white after:transition-all after:duration-500 after:content-['']">
          </div>
        </button>
        <nav class="hidden space-x-8 text-xl md:block" aria-label="main">
          <Link to="/" class="hover:opacity-90">Home</Link>
          <Link to="/movies" class="hover:opacity-90">Movies</Link>
          {
            isAuthenticated &&   <Link to="/movies/favorite" class="hover:opacity-90">Favorite Movies</Link>
          }
          {isAuthenticated 
          ? 
          <Link to="/" onClick={handleLogout} class="hover:opacity-90">Logout</Link>
          :
          <Link to="/login" class="hover:opacity-90">Login</Link>
          }
        </nav>
      </div>
    </section>
    <section id="mobile-menu"
      class="top-68 justify-center absolute hidden w-full origin-top animate-open-menu flex-col bg-black text-5xl">
      {/* <!-- <button class="text-8xl self-end px-6">
                &times;
            </button> --> */}
      <nav class="flex min-h-screen flex-col items-center py-8" aria-label="mobile">
        <Link to="/" class="w-full py-6 text-center hover:opacity-90">Home</Link>
        <Link to="/movies" class="w-full py-6 text-center hover:opacity-90">Movies</Link>
        {
          isAuthenticated && <Link to="/movies/favorite" class="w-full py-6 text-center hover:opacity-90">Favorite Moives</Link>
        }
       {
        isAuthenticated ?   <Link to="/logout" onClick={handleLogout} class="w-full py-6 text-center hover:opacity-90">Logout</Link>
        :  <Link to="/login" class="w-full py-6 text-center hover:opacity-90">Login</Link>
       }
     
      </nav>
    </section>
  </header>
   
  );
};

export default Navbar;

