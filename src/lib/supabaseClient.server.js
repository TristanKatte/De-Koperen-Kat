import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

// Alleen server-side gebruiken
export const supabaseServer = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
