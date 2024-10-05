import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-masters-green py-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" aria-label="Needa4th" className="text-white text-2xl font-normal" style={{ fontFamily: 'BentonSans, sans-serif' }}>
          Needa4th
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;