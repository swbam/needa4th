-- Ensure the tee_times table has all necessary columns
ALTER TABLE public.tee_times
ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
ADD COLUMN IF NOT EXISTS tee_date DATE,
ADD COLUMN IF NOT EXISTS tee_time TIME,
ADD COLUMN IF NOT EXISTS course TEXT,
ADD COLUMN IF NOT EXISTS slot INTEGER,
ADD COLUMN IF NOT EXISTS players TEXT[],
ADD COLUMN IF NOT EXISTS walk_ride TEXT,
ADD COLUMN IF NOT EXISTS organizer TEXT,
ADD COLUMN IF NOT EXISTS team1 TEXT[],
ADD COLUMN IF NOT EXISTS team2 TEXT[];

-- Update existing rows if necessary (example for date and time)
UPDATE public.tee_times
SET tee_date = date::DATE,
    tee_time = time::TIME
WHERE tee_date IS NULL AND date IS NOT NULL;

-- Drop columns that are no longer needed (if any)
-- ALTER TABLE public.tee_times DROP COLUMN IF EXISTS old_column_name;

-- Ensure proper permissions
GRANT ALL ON public.tee_times TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.tee_times_id_seq TO authenticated;