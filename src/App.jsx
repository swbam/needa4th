import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleSheetsProvider } from './integrations/googleSheets/googleSheetsApi';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import AddTeeTime from './pages/AddTeeTime';
import PastGames from './pages/PastGames';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleSheetsProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/add-tee-time" element={<AddTeeTime />} />
                <Route path="/past-games" element={<PastGames />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <BottomNav />
          </div>
        </Router>
      </GoogleSheetsProvider>
    </QueryClientProvider>
  );
}

export default App;