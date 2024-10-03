import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/needa4th-logo.svg" alt="Needa4th Logo" className="h-10 w-10" />
          <span className="text-2xl font-semibold">Needa4th</span>
        </Link>
        <div className="space-x-4">
          <Link to="/schedule" className="hover:text-green-300">Schedule</Link>
          <Link to="/add-tee-time" className="hover:text-green-300">Add Tee Time</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;