import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-masters-green py-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" aria-label="Needa4th">
          <img src="/logo-light.png" alt="Needa4th Logo" className="h-5" /> {/* Reduced from h-8 to h-5 (about 40% smaller) */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;