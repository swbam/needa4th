import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};

export const SupabaseAuthUI = () => {
  const { supabase } = useSupabaseAuth();

  const handleSignIn = async (provider) => {
    const { error } = await supabase.auth.signIn({ provider });
    if (error) console.error('Error signing in:', error);
  };

  return (
    <div>
      <button onClick={() => handleSignIn('google')}>Sign in with Google</button>
      {/* Add more sign-in options as needed */}
    </div>
  );
};