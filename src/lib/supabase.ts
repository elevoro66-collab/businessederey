import { createBrowserClient } from '@supabase/ssr'

// This is the "Translator" that talks to your database
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  
