import { supabase } from '../integrations/supabase/supabase';

const createTables = async () => {
  const { error: teeTimesError } = await supabase.rpc('create_tee_times_table');
  if (teeTimesError) console.error('Error creating tee_times table:', teeTimesError);

  const { error: usersError } = await supabase.rpc('create_users_table');
  if (usersError) console.error('Error creating users table:', usersError);

  const { error: coursesError } = await supabase.rpc('create_courses_table');
  if (coursesError) console.error('Error creating courses table:', coursesError);
};

export const initializeDatabase = async () => {
  try {
    await createTables();
    console.log('Database (Supabase) initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};