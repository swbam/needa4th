import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or API key is missing. Please check your .env file.')
  throw new Error('Supabase configuration is incomplete')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Supabase client initialized with URL:', supabaseUrl)

// Read and execute SQL commands
const sqlFilePath = path.join(__dirname, '../../utils/supabaseFunctions.sql')
const sqlCommands = fs.readFileSync(sqlFilePath, 'utf8')

const executeSqlCommands = async () => {
  const { error } = await supabase.rpc('exec_sql', { sql_string: sqlCommands })
  if (error) {
    console.error('Error executing SQL commands:', error)
  } else {
    console.log('SQL commands executed successfully')
  }
}

// Execute SQL commands
executeSqlCommands()

// Test the connection
supabase.from('tee_times').select('count', { count: 'exact' }).then(({ count, error }) => {
  if (error) {
    console.error('Error connecting to Supabase:', error)
  } else {
    console.log('Successfully connected to Supabase. Total tee times:', count)
  }
})