import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#006747] text-white py-2">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" className="text-2xl font-bold" style={{ fontFamily: 'Bellenord, sans-serif' }}>
          Needa4th
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;