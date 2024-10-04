-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to ensure tee_times table exists with all necessary columns
CREATE OR REPLACE FUNCTION public.create_tee_times_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.tee_times (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tee_date DATE,
    tee_time TIME,
    location TEXT,
    players TEXT[],
    walk_ride TEXT,
    organizer TEXT,
    attendees TEXT[],
    team1 TEXT[],
    team2 TEXT[]
  );

  BEGIN
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS tee_date DATE;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS tee_time TIME;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS location TEXT;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS players TEXT[];
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS walk_ride TEXT;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS organizer TEXT;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS attendees TEXT[];
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS team1 TEXT[];
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS team2 TEXT[];
  EXCEPTION
    WHEN duplicate_column THEN
      -- Do nothing, column already exists
  END;
END;
$$ LANGUAGE plpgsql;

-- Function to ensure users table exists with all necessary columns
CREATE OR REPLACE FUNCTION public.create_users_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    home_course TEXT
  );
END;
$$ LANGUAGE plpgsql;

-- Function to import data from the image
CREATE OR REPLACE FUNCTION public.import_image_data()
RETURNS void AS $$
BEGIN
  -- Import tee times data
  INSERT INTO public.tee_times (tee_date, tee_time, location, players, walk_ride, organizer, attendees)
  VALUES 
    ('2024-04-01', '07:00:00', 'Pinehurst No. 2', ARRAY['Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios'], 'Walk', 'Parker Smith', ARRAY['Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios']),
    ('2024-04-01', '07:10:00', 'Pinehurst No. 2', ARRAY['Derek Kozakiewicz', 'Jackson Smith', 'Bob Murray', 'Mike Brooks'], 'Walk', 'Derek Kozakiewicz', ARRAY['Derek Kozakiewicz', 'Jackson Smith', 'Bob Murray', 'Mike Brooks']),
    ('2024-04-01', '07:20:00', 'Pinehurst No. 2', ARRAY['Andrew Rocco', 'Heath Mansfield', 'Lane Hostettler', 'Josh Alcala'], 'Walk', 'Andrew Rocco', ARRAY['Andrew Rocco', 'Heath Mansfield', 'Lane Hostettler', 'Josh Alcala']),
    ('2024-04-01', '07:30:00', 'Pinehurst No. 2', ARRAY['Richard Caruso', 'Martin Clayton', 'Salvador Guzman', 'Jason Story'], 'Walk', 'Richard Caruso', ARRAY['Richard Caruso', 'Martin Clayton', 'Salvador Guzman', 'Jason Story']),
    ('2024-04-01', '07:40:00', 'Pinehurst No. 2', ARRAY['Nathan Bateman', 'Seth Bambling', 'Josh Link', 'Chris Baker'], 'Walk', 'Nathan Bateman', ARRAY['Nathan Bateman', 'Seth Bambling', 'Josh Link', 'Chris Baker']),
    ('2024-04-01', '07:50:00', 'Pinehurst No. 2', ARRAY['Kyle McFarland', 'Gilmore Connors', 'Alex York', 'Guest'], 'Walk', 'Kyle McFarland', ARRAY['Kyle McFarland', 'Gilmore Connors', 'Alex York', 'Guest']),
    ('2024-04-01', '08:00:00', 'Pinehurst No. 2', ARRAY['John Shrader'], 'Walk', 'John Shrader', ARRAY['John Shrader'])
  ON CONFLICT DO NOTHING;

  -- Import users data
  INSERT INTO public.users (name, email, home_course)
  VALUES 
    ('Parker Smith', 'parker@example.com', 'Pinehurst No. 2'),
    ('Dominic Nanni', 'dominic@example.com', 'Pinehurst No. 4'),
    ('Connor Stanley', 'connor@example.com', 'Pinehurst No. 8'),
    ('Jesus Rios', 'jesus@example.com', 'Tobacco Road'),
    ('Derek Kozakiewicz', 'derek@example.com', 'Pinehurst No. 2'),
    ('Jackson Smith', 'jackson@example.com', 'Pinehurst No. 4'),
    ('Bob Murray', 'bob@example.com', 'Pinehurst No. 8'),
    ('Mike Brooks', 'mike@example.com', 'Tobacco Road'),
    ('Andrew Rocco', 'andrew@example.com', 'Pinehurst No. 2'),
    ('Heath Mansfield', 'heath@example.com', 'Pinehurst No. 4'),
    ('Lane Hostettler', 'lane@example.com', 'Pinehurst No. 8'),
    ('Josh Alcala', 'josh.a@example.com', 'Tobacco Road'),
    ('Richard Caruso', 'richard@example.com', 'Pinehurst No. 2'),
    ('Martin Clayton', 'martin@example.com', 'Pinehurst No. 4'),
    ('Salvador Guzman', 'salvador@example.com', 'Pinehurst No. 8'),
    ('Jason Story', 'jason@example.com', 'Tobacco Road'),
    ('Nathan Bateman', 'nathan@example.com', 'Pinehurst No. 2'),
    ('Seth Bambling', 'seth@example.com', 'Pinehurst No. 4'),
    ('Josh Link', 'josh.l@example.com', 'Pinehurst No. 8'),
    ('Chris Baker', 'chris@example.com', 'Tobacco Road'),
    ('Kyle McFarland', 'kyle@example.com', 'Pinehurst No. 2'),
    ('Gilmore Connors', 'gilmore@example.com', 'Pinehurst No. 4'),
    ('Alex York', 'alex@example.com', 'Pinehurst No. 8'),
    ('John Shrader', 'john@example.com', 'Tobacco Road')
  ON CONFLICT (email) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Function to update teams for a tee time
CREATE OR REPLACE FUNCTION public.update_tee_time_teams(
  p_tee_time_id UUID,
  p_team1 TEXT[],
  p_team2 TEXT[]
)
RETURNS void AS $$
BEGIN
  UPDATE public.tee_times
  SET team1 = p_team1, team2 = p_team2
  WHERE id = p_tee_time_id;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.create_tee_times_table() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_users_table() TO authenticated;
GRANT EXECUTE ON FUNCTION public.import_image_data() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_tee_time_teams(UUID, TEXT[], TEXT[]) TO authenticated;

-- Execute the functions
SELECT create_tee_times_table();
SELECT create_users_table();
SELECT import_image_data();