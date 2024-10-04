import { executeSqlCommands } from '../integrations/supabase/supabase';

const sqlCommands = `
-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    holes INTEGER,
    par INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create tee_times table
CREATE TABLE IF NOT EXISTS public.tee_times (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tee_date DATE NOT NULL,
    tee_time TIME NOT NULL,
    course_id UUID REFERENCES public.courses(id),
    players TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id),
    tee_time_id UUID REFERENCES public.tee_times(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add some sample data to courses
INSERT INTO public.courses (name, location, holes, par)
VALUES 
('Pinehurst No. 2', 'Pinehurst, NC', 18, 72),
('Pinehurst No. 4', 'Pinehurst, NC', 18, 72),
('Pinehurst No. 8', 'Pinehurst, NC', 18, 72);

-- Ensure proper permissions
GRANT ALL ON public.courses TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.courses_id_seq TO authenticated;
GRANT ALL ON public.tee_times TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.tee_times_id_seq TO authenticated;
GRANT ALL ON public.bookings TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.bookings_id_seq TO authenticated;
`;

export const initializeDatabase = () => {
  executeSqlCommands(sqlCommands);
};