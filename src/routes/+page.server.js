// +page.server.js
import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data: beers, error: beersError } = await supabase
		.from('beers')
		.select('*');

	const { data: events, error: eventsError } = await supabase
		.from('events')
		.select('*');

	if (beersError || eventsError) {
		console.error('Error loading data:', beersError || eventsError);
	}

	return {
		beers,
		events
	};
}
