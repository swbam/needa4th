import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useUser, useUsers, useAddUser, useUpdateUser, useDeleteUser } from './hooks/useUsers.js';
import { useTeeTime, useTeeTimes, useAddTeeTime, useUpdateTeeTime, useDeleteTeeTime } from './hooks/useTeeTimes.js';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useUser,
  useUsers,
  useAddUser,
  useUpdateUser,
  useDeleteUser,
  useTeeTime,
  useTeeTimes,
  useAddTeeTime,
  useUpdateTeeTime,
  useDeleteTeeTime,
};