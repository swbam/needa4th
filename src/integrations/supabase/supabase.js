import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or API key is missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase client initialized with URL:', supabaseUrl);