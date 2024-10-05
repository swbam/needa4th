import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-masters-green shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="w-1/3"></div>
          <Link to="/" aria-label="needa4th" className="text-white text-2xl font-normal flex-1 text-center" style={{ fontFamily: 'BentonSans, sans-serif' }}>
            needa4th
          </Link>
          <div className="w-1/3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;