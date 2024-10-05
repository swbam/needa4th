import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#006747] py-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" aria-label="Needa4th">
          <img src="/needa4th-logo-white.png" alt="Needa4th Logo" className="h-12" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;