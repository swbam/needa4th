import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalUsers: 150,
    activeTeeTime: 25,
    totalRevenue: '$5,000'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Tee Times</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeTeeTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalRevenue}</p>
          </CardContent>
        </Card>
      </div>
      <Button>Generate Report</Button>
    </div>
  );
};

export default AdminDashboard;