import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" className="text-5xl font-bold text-[#006747]" aria-label="Needa4th">
          needa<span className="text-[#006747]">4</span>th<span className="text-[#006747]">?</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;