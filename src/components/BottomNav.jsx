import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Clock, PlusCircle, MapPin } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { to: "/schedule", icon: Calendar, label: "Schedule" },
    { to: "/past", icon: Clock, label: "Past" },
    { to: "/add-tee-time", icon: PlusCircle, label: "Add Tee Time" },
    { to: "/add-course", icon: MapPin, label: "Add Course" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center text-xs ${
                location.pathname === item.to ? 'text-green-800' : 'text-gray-500'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;