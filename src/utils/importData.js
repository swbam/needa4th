import { supabase } from '../integrations/supabase/supabase';

const createTables = async () => {
  const { error: teeTimesError } = await supabase.rpc('create_tee_times_table');
  if (teeTimesError) console.error('Error creating tee_times table:', teeTimesError);

  const { error: usersError } = await supabase.rpc('create_users_table');
  if (usersError) console.error('Error creating users table:', usersError);
};

const importTeeTimes = async (csvData) => {
  const rows = csvData.split('\n').slice(1); // Skip header row
  const teeTimes = rows.filter(row => row.trim() !== '').map(row => {
    const [date, location, time, players, slot, walkRide, organizer, attendee] = row.split(',');
    return {
      date,
      location,
      time,
      players: parseInt(players),
      slot: parseInt(slot),
      walk_ride: walkRide,
      organizer,
      attendees: [attendee].filter(a => a && a !== ''),
    };
  });

  // Group tee times by date, location, and time
  const groupedTeeTimes = teeTimes.reduce((acc, teeTime) => {
    const key = `${teeTime.date}-${teeTime.location}-${teeTime.time}`;
    if (!acc[key]) {
      acc[key] = { ...teeTime, attendees: [] };
    }
    acc[key].attendees = [...acc[key].attendees, ...teeTime.attendees];
    return acc;
  }, {});

  for (const teeTime of Object.values(groupedTeeTimes)) {
    const { data, error } = await supabase
      .from('tee_times')
      .insert({
        date: teeTime.date,
        location: teeTime.location,
        time: teeTime.time,
        players: teeTime.players,
        walk_ride: teeTime.walk_ride,
        organizer: teeTime.organizer,
        attendees: teeTime.attendees,
      });

    if (error) console.error('Error inserting tee time:', error);
    else console.log('Tee time inserted:', data);
  }
};

const importUsers = async (csvData) => {
  const rows = csvData.split('\n').slice(-25); // Get last 25 rows
  const users = rows.filter(row => row.trim() !== '').map(row => {
    const [name, email, homeCourse, rating] = row.split(',');
    return { name, email, home_course: homeCourse, rating: rating !== 'N/A' ? parseFloat(rating) : null };
  });

  for (const user of users) {
    const { data, error } = await supabase
      .from('users')
      .insert(user);

    if (error) console.error('Error inserting user:', error);
    else console.log('User inserted:', data);
  }
};

export const importAllData = async (csvData) => {
  await createTables();
  await importTeeTimes(csvData);
  await importUsers(csvData);
};