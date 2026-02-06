import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function load({ params }) {
	const { slug } = params;

	const { data: beer, error } = await supabase
		.from('beers')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) {
		console.error('Error loading beer:', error);
		return { beer: null };
	}

	return { beer };
}
