import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/schedule", label: "Schedule" },
    { to: "/add-tee-time", label: "Add Tee Time" },
    { to: "/add-course", label: "Add Course" },
    { to: "/pricing", label: "Pricing" },
    { to: "/settings", label: "Settings" },
    { to: "/login", label: "Admin" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <img src="/needa4th-logo.svg" alt="Needa4th Logo" className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-green-800 hover:text-green-600 px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-green-800 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-green-800 hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;