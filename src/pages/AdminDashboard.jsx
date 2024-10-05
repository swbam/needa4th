import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { importAllData } from '../utils/importData';
import { toast } from "sonner";

const AdminDashboard = () => {
  const [isImporting, setIsImporting] = useState(false);

  const handleImportData = async () => {
    setIsImporting(true);
    try {
      await importAllData();
      toast.success("Data imported successfully");
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error("Failed to import data. Check console for details.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Button 
        onClick={handleImportData} 
        className="bg-blue-500 hover:bg-blue-600 text-white"
        disabled={isImporting}
      >
        {isImporting ? 'Importing...' : 'Import All Data'}
      </Button>
      {isImporting && <p className="mt-2 text-gray-600">Import in progress, please wait...</p>}
    </div>
  );
};

export default AdminDashboard;