import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-800 p-2">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" className="text-white">
          <img 
            src="/needa4th-logo-white.png" 
            alt="Needa4th Logo" 
            className="h-[50px] w-auto"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;