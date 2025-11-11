import { createClient } from '@supabase/supabase-js';

// Supabase client for browser-side usage. Requires the public env vars below.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
);

export default supabase;
