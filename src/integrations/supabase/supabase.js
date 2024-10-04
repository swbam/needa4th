import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or API key is missing. Please check your .env file.')
  throw new Error('Supabase configuration is incomplete')
}

// Validate the URL
try {
  new URL(supabaseUrl)
} catch (error) {
  console.error('Invalid Supabase URL:', supabaseUrl)
  throw new Error('Invalid Supabase URL. Please check your .env file.')
}

// Validate the API key format (basic check)
if (!/^[a-zA-Z0-9._-]+$/.test(supabaseKey)) {
  console.error('Invalid Supabase API key format')
  throw new Error('Invalid Supabase API key format. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Failed to connect to Supabase:', error.message)
    throw new Error('Failed to connect to Supabase. Please check your API key.')
  } else {
    console.log('Successfully connected to Supabase')
  }
})

console.log('Supabase client initialized with URL:', supabaseUrl)