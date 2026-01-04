import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function load() {
	const { data: beers, error } = await supabase
		.from('beers')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error loading beers:', error);
		return { beers: [] };
	}

	return { beers };
}
