import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
const supabaseUrl = 'https://uggzpiytpykmfuubstfn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZ3pwaXl0cHlrbWZ1dWJzdGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODg1MjEsImV4cCI6MjA3MzA2NDUyMX0.qq0JlKAoFCEweMqgWCQ2q7djCfkjowzZKk55cHR9PVg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)