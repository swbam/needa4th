import { supabase } from './supabase';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth';

// Import and export all hooks
import {
  usePlayersTeeTime,
  usePlayersTeeTimesByPlayer,
  usePlayersTeeTimesByTeeTime,
  useAddPlayerTeeTime,
  useUpdatePlayerTeeTime,
  useDeletePlayerTeeTime
} from './hooks/players_tee_times';

import {
  usePlayer,
  usePlayers,
  useAddPlayer,
  useUpdatePlayer,
  useDeletePlayer
} from './hooks/players';

import {
  useTeeTime,
  useTeeTimes,
  useAddTeeTime,
  useUpdateTeeTime,
  useDeleteTeeTime
} from './hooks/tee_times';

import {
  useScore,
  useScores,
  useAddScore,
  useUpdateScore,
  useDeleteScore
} from './hooks/scores';

import {
  useCourse,
  useCourses,
  useAddCourse,
  useUpdateCourse,
  useDeleteCourse
} from './hooks/courses';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  usePlayersTeeTime,
  usePlayersTeeTimesByPlayer,
  usePlayersTeeTimesByTeeTime,
  useAddPlayerTeeTime,
  useUpdatePlayerTeeTime,
  useDeletePlayerTeeTime,
  usePlayer,
  usePlayers,
  useAddPlayer,
  useUpdatePlayer,
  useDeletePlayer,
  useTeeTime,
  useTeeTimes,
  useAddTeeTime,
  useUpdateTeeTime,
  useDeleteTeeTime,
  useScore,
  useScores,
  useAddScore,
  useUpdateScore,
  useDeleteScore,
  useCourse,
  useCourses,
  useAddCourse,
  useUpdateCourse,
  useDeleteCourse
};