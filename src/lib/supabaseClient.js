import { createClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

const url = browser ? PUBLIC_SUPABASE_URL : SUPABASE_URL;
const key = browser ? PUBLIC_SUPABASE_ANON_KEY : SUPABASE_ANON_KEY;

export const supabase = createClient(url, key);
