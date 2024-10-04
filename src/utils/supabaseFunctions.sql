-- Insert sample tee times
INSERT INTO public.tee_times (tee_date, tee_time, course, slot, players, walk_ride, organizer, team1, team2)
VALUES
  ('2024-04-01', '07:00:00', 'Pinehurst No. 2', 1, ARRAY['Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios'], 'Walk', 'Parker Smith', ARRAY['Parker Smith', 'Dominic Nanni'], ARRAY['Connor Stanley', 'Jesus Rios']),
  ('2024-04-01', '07:10:00', 'Pinehurst No. 2', 2, ARRAY['Derek Kozakiewicz', 'Jackson Smith', 'Bob Murray', 'Mike Brooks'], 'Walk', 'Derek Kozakiewicz', ARRAY['Derek Kozakiewicz', 'Jackson Smith'], ARRAY['Bob Murray', 'Mike Brooks']),
  ('2024-04-01', '07:20:00', 'Pinehurst No. 2', 3, ARRAY['Andrew Rocco', 'Heath Mansfield', 'Lane Hostettler', 'Josh Alcala'], 'Walk', 'Andrew Rocco', ARRAY['Andrew Rocco', 'Heath Mansfield'], ARRAY['Lane Hostettler', 'Josh Alcala']),
  ('2024-04-02', '08:00:00', 'Pinehurst No. 4', 1, ARRAY['Richard Caruso', 'Martin Clayton'], 'Ride', 'Richard Caruso', NULL, NULL),
  ('2024-04-02', '08:10:00', 'Pinehurst No. 4', 2, ARRAY['Salvador Guzman', 'Jason Story'], 'Ride', 'Salvador Guzman', NULL, NULL),
  ('2024-04-03', '09:00:00', 'Pinehurst No. 8', 1, ARRAY['Nathan Bateman'], 'Walk', 'Nathan Bateman', NULL, NULL);

-- Ensure proper permissions
GRANT ALL ON public.tee_times TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.tee_times_id_seq TO authenticated;