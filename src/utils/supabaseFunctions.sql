-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to ensure tee_times table exists with all necessary columns
CREATE OR REPLACE FUNCTION public.create_tee_times_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.tee_times (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    course TEXT NOT NULL,
    slot INTEGER NOT NULL,
    players TEXT[] NOT NULL,
    walk_ride TEXT NOT NULL,
    organizer TEXT NOT NULL
  );
END;
$$ LANGUAGE plpgsql;

-- Function to ensure users table exists with all necessary columns
CREATE OR REPLACE FUNCTION public.create_users_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );
END;
$$ LANGUAGE plpgsql;

-- Function to import tee times data
CREATE OR REPLACE FUNCTION public.import_tee_times_data()
RETURNS void AS $$
DECLARE
  tee_time_data TEXT[][] := ARRAY[
    -- Insert your tee time data here
    -- Format: {date, time, course, slot, player1, player2, player3, player4, walk_ride, organizer}
    {'2023/04/01', '0700', 'Pinehurst No. 2', '1', 'Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios', 'Walk', 'Parker Smith'},
    {'2023/04/01', '0710', 'Pinehurst No. 2', '1', 'Derek Kozakiewicz', 'Jackson Smith', 'Bob Murray', 'Mike Brooks', 'Walk', 'Derek Kozakiewicz'}
    -- Add more rows as needed
  ];
  row TEXT[];
BEGIN
  FOREACH row SLICE 1 IN ARRAY tee_time_data
  LOOP
    INSERT INTO public.tee_times (date, time, course, slot, players, walk_ride, organizer)
    VALUES (
      row[1]::DATE,
      row[2]::TIME,
      row[3],
      row[4]::INTEGER,
      ARRAY[row[5], row[6], row[7], row[8]],
      row[9],
      row[10]
    )
    ON CONFLICT DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to import users data
CREATE OR REPLACE FUNCTION public.import_users_data()
RETURNS void AS $$
DECLARE
  user_data TEXT[][] := ARRAY[
    -- Insert your user data here
    -- Format: {name, email}
    {'Parker Smith', 'parker@example.com'},
    {'Dominic Nanni', 'dominic@example.com'}
    -- Add more rows as needed
  ];
  row TEXT[];
BEGIN
  FOREACH row SLICE 1 IN ARRAY user_data
  LOOP
    INSERT INTO public.users (name, email)
    VALUES (row[1], row[2])
    ON CONFLICT (email) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.create_tee_times_table() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_users_table() TO authenticated;
GRANT EXECUTE ON FUNCTION public.import_tee_times_data() TO authenticated;
GRANT EXECUTE ON FUNCTION public.import_users_data() TO authenticated;

-- Execute the functions
SELECT create_tee_times_table();
SELECT create_users_table();
SELECT import_tee_times_data();
SELECT import_users_data();