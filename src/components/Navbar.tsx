// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 w-full"> {/* Ajout de w-full pour pleine largeur */}
      <div className="flex justify-between items-center"> 
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyApp
        </Link>
        {/* Menu */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/task"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/sign-up"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
