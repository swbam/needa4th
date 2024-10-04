import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-masters-green h-[60px] flex items-center">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" className="text-white">
          <img 
            src="/needa4th-logo-white.png" 
            alt="Needa4th Logo" 
            className="h-[26px] w-auto" 
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;