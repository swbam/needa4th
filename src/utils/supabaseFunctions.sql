-- Create courses table
CREATE TABLE public.courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    holes INTEGER,
    par INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create bookings table
CREATE TABLE public.bookings (
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
GRANT ALL ON public.bookings TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.bookings_id_seq TO authenticated;

-- Add a course_id foreign key to tee_times table
ALTER TABLE public.tee_times
ADD COLUMN course_id UUID REFERENCES public.courses(id);

-- Update existing tee_times with course_id (assuming course names match)
UPDATE public.tee_times
SET course_id = (SELECT id FROM public.courses WHERE name = tee_times.course)
WHERE course IS NOT NULL;

-- You may want to make course_id NOT NULL after updating existing records
-- ALTER TABLE public.tee_times ALTER COLUMN course_id SET NOT NULL;

-- Consider dropping the 'course' column from tee_times if you no longer need it
-- ALTER TABLE public.tee_times DROP COLUMN course;