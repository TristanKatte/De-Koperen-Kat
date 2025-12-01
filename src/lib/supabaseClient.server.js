// src/lib/supabaseClient.server.js
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
