import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Welcome to Needa4th</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tee Times</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have 2 upcoming tee times.</p>
            <Link to="/schedule">
              <Button className="mt-4">View Schedule</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add New Tee Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Quickly schedule a new tee time.</p>
            <Link to="/add-tee-time">
              <Button className="mt-4">Add Tee Time</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Add or edit golf courses.</p>
            <Link to="/add-course">
              <Button className="mt-4">Manage Courses</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;