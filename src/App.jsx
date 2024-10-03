import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Schedule from './pages/Schedule';
import AddTeeTime from './pages/AddTeeTime';
import AddCourse from './pages/AddCourse';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import { Toaster } from "@/components/ui/sonner";
import SaaSFramework from './components/SaaSFramework';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SaaSFramework>
          <div className="flex flex-col min-h-screen w-full bg-green-50">
            <Navbar />
            <main className="flex-grow w-full">
              <Routes>
                <Route path="/" element={<Navigate to="/schedule" replace />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/add-tee-time" element={<AddTeeTime />} />
                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
            <BottomNav />
          </div>
        </SaaSFramework>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;