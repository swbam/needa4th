import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseAuthProvider } from './integrations/supabase/auth';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Schedule from './pages/Schedule';
import AddTeeTime from './pages/AddTeeTime';
import PastGames from './pages/PastGames';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import { importAllData } from './utils/importData';
import { toast } from "sonner";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const runImport = async () => {
      try {
        await importAllData();
        toast.success("Previous tee times imported successfully");
      } catch (error) {
        console.error("Error importing data:", error);
        toast.error("Failed to import previous tee times");
      }
    };

    runImport();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-6 mb-16">
              <Routes>
                <Route path="/" element={<Navigate replace to="/schedule" />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/add-tee-time" element={<AddTeeTime />} />
                <Route path="/past" element={<PastGames />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <BottomNav />
          </div>
        </Router>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}

export default App;