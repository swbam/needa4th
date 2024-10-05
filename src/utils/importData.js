import { supabase } from '../integrations/supabase/supabase';
import { teeTimes, users } from './csvData';

const importTeeTimes = async () => {
  const formattedTeeTimes = teeTimes.map(teeTime => ({
    date: teeTime.Date,
    location: teeTime.Location,
    time: teeTime.Time,
    max_players: parseInt(teeTime['# of Players']),
    organizer: teeTime.Organizer,
    attendees: [teeTime.Organizer, teeTime.Attendee].filter(Boolean),
  }));

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
  const formattedUsers = users.map(user => ({
    name: user.name,
    email: user.email,
    home_course: user.homeCourse,
    handicap: user.rating !== null ? parseFloat(user.rating) : null,
  }));

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
  try {
    await importTeeTimes();
    await importUsers();
    console.log('All data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
};