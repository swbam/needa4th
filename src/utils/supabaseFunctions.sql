-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
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

-- Ensure proper permissions
GRANT ALL ON public.courses TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.courses_id_seq TO authenticated;
GRANT ALL ON public.tee_times TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.tee_times_id_seq TO authenticated;

-- You may want to make course_id NOT NULL after updating existing records
-- ALTER TABLE public.tee_times ALTER COLUMN course_id SET NOT NULL;