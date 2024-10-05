import { supabase } from '../integrations/supabase/supabase';

const checkTables = async () => {
  try {
    const { data: teeTimesData, error: teeTimesError } = await supabase
      .from('tee_times')
      .select('*')
      .limit(1);
    
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    const { data: coursesData, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .limit(1);

    if (teeTimesError) console.warn('Tee times table might not exist:', teeTimesError.message);
    if (usersError) console.warn('Users table might not exist:', usersError.message);
    if (coursesError) console.warn('Courses table might not exist:', coursesError.message);

    console.log('Tables checked successfully');
  } catch (error) {
    console.error('Error checking tables:', error.message);
    throw error;
  }
};

export const initializeDatabase = async () => {
  try {
    await checkTables();
    console.log('Database (Supabase) connection verified successfully.');
  } catch (error) {
    console.error('Error verifying database connection:', error.message);
    throw error;
  }
};