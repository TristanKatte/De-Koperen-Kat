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

	const taggedNews = (newsEvents ?? []).map(e => ({ ...e, type: 'news' }));
	const taggedAgenda = (agendaEvents ?? []).map(e => ({ ...e, type: 'agenda' }));

	// Samenvoegen + sorteren
	const allEvents = [...taggedNews, ...taggedAgenda].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	return {
		beers,
		events: allEvents.slice(0, 10) // Limiteer tot de eerste 10 evenementen
	};
}
