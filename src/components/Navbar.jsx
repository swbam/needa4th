import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-masters-green shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-14">
          <Link 
            to="/" 
            aria-label="needa4th" 
            className="text-white text-2xl font-normal leading-none pt-[5px]"
            style={{ fontFamily: 'BentonSans, sans-serif' }}
          >
            needa4th
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;