import { createClient } from '@supabase/supabase-js'

// These will be automatically configured by Lovable when connected to Supabase
const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)