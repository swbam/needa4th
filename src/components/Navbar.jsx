import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#006747] py-2">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" className="flex items-center">
          <img src="/needa4th-logo-white.png" alt="Needa4th Logo" className="h-12 mr-2" />
          <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Bellenord, sans-serif' }}>
            Needa4th
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;