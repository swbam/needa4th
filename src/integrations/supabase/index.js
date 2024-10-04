import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useTeeTimes, useAddTeeTime, useUpdateTeeTime, useDeleteTeeTime } from './hooks/useTeeTimes.js';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useTeeTimes,
  useAddTeeTime,
  useUpdateTeeTime,
  useDeleteTeeTime,
};