import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hnjembjvwnixqkksefni.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuamVtYmp2d25peHFra3NlZm5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5OTgwMDQsImV4cCI6MjA0MzU3NDAwNH0.qMOZRi0co0NelQ6Blh5kac_1ZR4YT_6Aw2-9P9wdY9o'

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or API key is missing. Please check your configuration.')
  throw new Error('Supabase configuration is incomplete')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Supabase client initialized with URL:', supabaseUrl)

// Test the connection
supabase.from('tee_times').select('count', { count: 'exact' }).then(({ count, error }) => {
  if (error) {
    console.error('Error connecting to Supabase:', error)
  } else {
    console.log('Successfully connected to Supabase. Total tee times:', count)
  }
})