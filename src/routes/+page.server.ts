import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data: beers, error: beersError } = await supabase.from('beers').select('*');
	const { data: events, error: eventsError } = await supabase.from('events').select('*');

	if (beersError || eventsError) {
		console.error('Error loading data:', beersError || eventsError);
	}

	return { beers, events };
};
