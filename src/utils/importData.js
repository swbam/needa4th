import { supabase } from '../integrations/supabase/supabase';
import { teeTimes, users } from './csvData';

const importTeeTimes = async () => {
  console.log('Starting tee times import...');
  const formattedTeeTimes = teeTimes.map(teeTime => ({
    date: teeTime.Date,
    location: teeTime.Location,
    time: teeTime.Time,
    max_players: parseInt(teeTime['# of Players']),
    organizer: teeTime.Organizer,
    attendees: [teeTime.Organizer, teeTime.Attendee].filter(Boolean),
  }));

  console.log('Formatted tee times:', formattedTeeTimes);

  const { data, error } = await supabase
    .from('tee_times')
    .upsert(formattedTeeTimes, { onConflict: ['date', 'time', 'location'] })
    .select();

  if (error) {
    console.error('Error importing tee times:', error);
    throw error;
  }

  console.log('Tee times imported successfully:', data);
  return data;
};

const importUsers = async () => {
  console.log('Starting users import...');
  const formattedUsers = users.map(user => ({
    name: user.name,
    email: user.email,
    home_course: user.homeCourse,
    handicap: user.rating !== null ? parseFloat(user.rating) : null,
  }));

  console.log('Formatted users:', formattedUsers);

  const { data, error } = await supabase
    .from('users')
    .upsert(formattedUsers, { onConflict: ['email'] })
    .select();

  if (error) {
    console.error('Error importing users:', error);
    throw error;
  }

  console.log('Users imported successfully:', data);
  return data;
};

export const importAllData = async () => {
  console.log('Starting data import process...');
  try {
    await importTeeTimes();
    await importUsers();
    console.log('All data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
};