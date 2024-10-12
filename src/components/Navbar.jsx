import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-masters-green shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-14">
          <Link
            to="/"
            aria-label="needa4th"
          >
            <img
              src="/needa4th-logo-white.png"
              alt="needa4th logo"
              className="h-7"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;