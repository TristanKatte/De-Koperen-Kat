// +page.server.js
import { supabase } from '$lib/supabaseClient.js';

export async function load() {
	// 🍺 Bieren
	const { data: beers, error: beersError } = await supabase
		.from('beers')
		.select('*');

	// 📅 Opkomende events (nieuws-events)
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const { data: events, error: eventsError } = await supabase
		.from('news_events')
		.select('*')
		.gte('date', today.toISOString())
		.order('date', { ascending: true })
		.limit(6);

	if (beersError || eventsError) {
		console.error('Error loading data:', beersError || eventsError);
	}

	return {
		beers,
		events
	};
}
