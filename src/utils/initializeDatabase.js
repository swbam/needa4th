import { supabase } from '../integrations/supabase/supabase';

const createTables = async () => {
  try {
    const { error: teeTimesError } = await supabase.rpc('create_tee_times_table');
    if (teeTimesError) throw new Error(`Error creating tee_times table: ${teeTimesError.message}`);

    const { error: usersError } = await supabase.rpc('create_users_table');
    if (usersError) throw new Error(`Error creating users table: ${usersError.message}`);

    const { error: coursesError } = await supabase.rpc('create_courses_table');
    if (coursesError) throw new Error(`Error creating courses table: ${coursesError.message}`);

    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
    throw error;
  }
};

export const initializeDatabase = async () => {
  try {
    await createTables();
    console.log('Database (Supabase) initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error.message);
    throw error;
  }
};