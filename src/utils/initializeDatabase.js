import { supabase } from '../integrations/supabase/supabase';

const createTables = async () => {
  const createCoursesTable = `
    CREATE TABLE IF NOT EXISTS public.courses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT,
      holes INTEGER,
      par INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );
  `;

  const createTeeTimesTable = `
    CREATE TABLE IF NOT EXISTS public.tee_times (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      tee_date DATE NOT NULL,
      tee_time TIME NOT NULL,
      course_id UUID REFERENCES public.courses(id),
      players TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );
  `;

  const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS public.bookings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES public.users(id),
      tee_time_id UUID REFERENCES public.tee_times(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );
  `;

  try {
    await supabase.rpc('exec_sql', { sql_string: createCoursesTable });
    await supabase.rpc('exec_sql', { sql_string: createTeeTimesTable });
    await supabase.rpc('exec_sql', { sql_string: createBookingsTable });
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

const insertSampleData = async () => {
  const { data, error } = await supabase
    .from('courses')
    .insert([
      { name: 'Pinehurst No. 2', location: 'Pinehurst, NC', holes: 18, par: 72 },
      { name: 'Pinehurst No. 4', location: 'Pinehurst, NC', holes: 18, par: 72 },
      { name: 'Pinehurst No. 8', location: 'Pinehurst, NC', holes: 18, par: 72 }
    ]);

  if (error) {
    console.error('Error inserting sample data:', error);
  } else {
    console.log('Sample data inserted successfully');
  }
};

export const initializeDatabase = async () => {
  await createTables();
  await insertSampleData();
};