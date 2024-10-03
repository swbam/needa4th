import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-green-800 mb-6">Welcome to Needa4th</h1>
      <p className="text-xl mb-8">Organize your golf games with friends easily!</p>
      <div className="space-y-4">
        <Link to="/schedule">
          <Button className="w-full sm:w-auto">View Schedule</Button>
        </Link>
        <Link to="/add-tee-time">
          <Button className="w-full sm:w-auto" variant="outline">Add Tee Time</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;