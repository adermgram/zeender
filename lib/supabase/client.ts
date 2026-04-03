import { createBrowserClient } from '@supabase/ssr'

// Supabase renamed "anon key" to "publishable key" in newer projects.
// We support both env var names — whichever is set will be used.
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey!
  )
}
