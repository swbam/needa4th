import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <img src="/needa4th-logo.svg" alt="Needa4th Logo" className="h-8 w-auto" />
          </Link>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/dashboard" className="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/schedule" className="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Schedule
            </Link>
            <Link to="/add-tee-time" className="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Add Tee Time
            </Link>
            <Link to="/add-course" className="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Add Course
            </Link>
            <Link to="/pricing" className="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Pricing
            </Link>
            <Link to="/settings" className="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;