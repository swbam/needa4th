import { supabase } from '../integrations/supabase/supabase';
import { fetchSheetData } from '../integrations/googleSheets/googleSheetsApi';

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
  try {
    const sheetData = await fetchSheetData();
    
    // Assuming the first row is headers
    const headers = sheetData[0];
    const teeTimesData = sheetData.slice(1).map(row => {
      const teeTime = {};
      headers.forEach((header, index) => {
        teeTime[header.toLowerCase().replace(' ', '_')] = row[index];
      });
      return teeTime;
    });

    // Insert courses
    const uniqueCourses = [...new Set(teeTimesData.map(tt => tt.course))];
    const { data: coursesData, error: coursesError } = await supabase
      .from('courses')
      .upsert(uniqueCourses.map(course => ({ name: course })), { onConflict: 'name' })
      .select();

    if (coursesError) throw coursesError;

    // Create a map of course names to their IDs
    const courseIdMap = Object.fromEntries(coursesData.map(c => [c.name, c.id]));

    // Insert tee times
    const { error: teeTimesError } = await supabase
      .from('tee_times')
      .upsert(
        teeTimesData.map(tt => ({
          tee_date: tt.date,
          tee_time: tt.time,
          course_id: courseIdMap[tt.course],
          players: tt.players.split(',').map(p => p.trim()),
        }))
      );

    if (teeTimesError) throw teeTimesError;

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

export const initializeDatabase = async () => {
  await createTables();
  await insertSampleData();
};