import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

/**
 * Returns the initialized Supabase client setup with the public anon key.
 * If Supabase variables are not configured in the environment settings,
 * it returns null rather than crashing the React application, allowing
 * beautiful diagnostic handling.
 */
export function getSupabase(): SupabaseClient | null {
  const url = (import.meta as any).env.VITE_SUPABASE_URL;
  const key = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(url, key);
  }

  return supabaseInstance;
}
