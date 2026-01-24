// +page.server.js
import { supabase } from '$lib/supabaseClient.js';

export async function load() {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const { data: beers } = await supabase.from('beers').select('*');

	const { data: newsEvents } = await supabase
		.from('news_events')
		.select('*')
		.gte('date', today.toISOString());

	const { data: agendaEvents } = await supabase
		.from('events')
		.select('*')
		.gte('date', today.toISOString());

	// Samenvoegen + sorteren
	const allEvents = [...(newsEvents ?? []), ...(agendaEvents ?? [])].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	return {
		beers,
		events: allEvents.slice(0, 8) // Limiteer tot de eerste 8 evenementen
	};
}
