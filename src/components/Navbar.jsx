import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '../services/userSlice';
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state=> state.user?.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());  
    toast.info("User Logout  successfully!");        
    navigate("/login");           
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-gray-200">BrandName</Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-blue-700 rounded md:inline md:hover:bg-transparent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="block py-2 px-4 hover:bg-blue-700 rounded md:inline md:hover:bg-transparent"
              >
                Movies
              </Link>
            </li>
            {
            !isAuthenticated ?
            <li>
              <Link
                to="/login"
                className="block py-2 px-4 hover:bg-blue-700 rounded md:inline md:hover:bg-transparent"
              >
                Login
              </Link>
            </li>:<li>
              <Link
                to="/login"
                onClick={handleLogout}
                className="block py-2 px-4 hover:bg-blue-700 rounded md:inline md:hover:bg-transparent"
              >
                Logout
              </Link>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
