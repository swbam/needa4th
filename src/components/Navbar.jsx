import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-800 py-2">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" className="text-2xl font-bold text-white" style={{ fontFamily: 'Bellenord, sans-serif' }}>
          Needa4th
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;