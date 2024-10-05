import { supabase } from '../integrations/supabase/supabase';
import { teeTimes } from './csvData';

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
    .insert(formattedTeeTimes);

  if (error) {
    console.error('Error importing tee times:', error);
    throw error;
  }

  console.log('Tee times imported successfully:', data);
  return data;
};

export const importAllData = async () => {
  try {
    await importTeeTimes();
    console.log('All data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};