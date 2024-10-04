import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Schedule from './pages/Schedule';
import PastGames from './pages/PastGames';
import AddCourse from './pages/AddCourse';
import Profile from './pages/Profile';
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/schedule" replace />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/past" element={<PastGames />} />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;