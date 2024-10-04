import { supabase } from '../integrations/supabase/supabase';
import { fetchSheetData } from '../integrations/googleSheets/googleSheetsApi';

const createTables = async () => {
  try {
    // Create courses table
    await supabase.from('courses').upsert([], { count: 'exact', onConflict: 'name' });
    
    // Create tee_times table
    await supabase.from('tee_times').upsert([], { count: 'exact', onConflict: 'id' });
    
    // Create bookings table
    await supabase.from('bookings').upsert([], { count: 'exact', onConflict: 'id' });
    
    console.log('Tables created or verified successfully');
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