-- Function to ensure tee_times table exists with all necessary columns
CREATE OR REPLACE FUNCTION public.create_tee_times_table()
RETURNS void AS $$
BEGIN
  -- Create the table if it doesn't exist
  CREATE TABLE IF NOT EXISTS public.tee_times (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tee_date DATE,
    tee_time TIME,
    location TEXT,
    players TEXT[],
    walk_ride TEXT,
    organizer TEXT,
    attendees TEXT[]
  );

  -- Add columns if they don't exist
  BEGIN
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS tee_date DATE;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS tee_time TIME;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS location TEXT;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS players TEXT[];
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS walk_ride TEXT;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS organizer TEXT;
    ALTER TABLE public.tee_times ADD COLUMN IF NOT EXISTS attendees TEXT[];
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
  -- Create the table if it doesn't exist
  CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    home_course TEXT,
    rating NUMERIC
  );

  -- Add columns if they don't exist
  BEGIN
    ALTER TABLE public.users ADD COLUMN IF NOT EXISTS name TEXT;
    ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
    ALTER TABLE public.users ADD COLUMN IF NOT EXISTS home_course TEXT;
    ALTER TABLE public.users ADD COLUMN IF NOT EXISTS rating NUMERIC;
  EXCEPTION
    WHEN duplicate_column THEN
      -- Do nothing, column already exists
  END;
END;
$$ LANGUAGE plpgsql;

-- Function to add sample data
CREATE OR REPLACE FUNCTION public.add_sample_data()
RETURNS void AS $$
BEGIN
  -- Add sample tee times
  INSERT INTO public.tee_times (tee_date, tee_time, location, players, walk_ride, organizer, attendees)
  VALUES 
    ('2024-04-01', '07:00:00', 'Pinehurst No. 2', ARRAY['Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios'], 'Walk', 'Parker Smith', ARRAY['Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios']),
    ('2024-04-01', '07:10:00', 'Pinehurst No. 2', ARRAY['Derek Kozakiewicz', 'Jackson Smith', 'Bob Murray', 'Mike Brooks'], 'Walk', 'Derek Kozakiewicz', ARRAY['Derek Kozakiewicz', 'Jackson Smith', 'Bob Murray', 'Mike Brooks'])
  ON CONFLICT DO NOTHING;

  -- Add sample users
  INSERT INTO public.users (name, email, home_course, rating)
  VALUES 
    ('Parker Smith', 'parker@example.com', 'Pinehurst No. 2', 4.2),
    ('Dominic Nanni', 'dominic@example.com', 'Pinehurst No. 4', 3.8),
    ('Connor Stanley', 'connor@example.com', 'Pinehurst No. 8', 4.5),
    ('Jesus Rios', 'jesus@example.com', 'Tobacco Road', 4.0),
    ('Derek Kozakiewicz', 'derek@example.com', 'Pinehurst No. 2', 3.9)
  ON CONFLICT (email) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Execute the functions
SELECT create_tee_times_table();
SELECT create_users_table();
SELECT add_sample_data();