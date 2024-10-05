import React from 'react';
import { Button } from "@/components/ui/button";
import { importAllData } from '../utils/importData';
import { toast } from "sonner";

const AdminDashboard = () => {
  const handleImportData = async () => {
    try {
      await importAllData();
      toast.success("Data imported successfully");
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error("Failed to import data. Check console for details.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Button onClick={handleImportData} className="bg-blue-500 hover:bg-blue-600 text-white">
        Import All Data
      </Button>
    </div>
  );
};

export default AdminDashboard;