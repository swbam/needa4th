import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initializeDatabase } from './utils/initializeDatabase';
import { SupabaseAuthProvider } from './integrations/supabase';

// Initialize the database (Supabase connection)
initializeDatabase().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <SupabaseAuthProvider>
        <App />
      </SupabaseAuthProvider>
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Failed to initialize database:', error);
});