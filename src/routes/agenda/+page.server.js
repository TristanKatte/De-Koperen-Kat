// src/routes/events/+page.server.js
import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data: events, error } = await supabase
		.from('events')
		.select('*')
		.order('date', { ascending: false });

	if (error) {
		console.error('❌ Fout bij het ophalen van evenementen:', error.message);
		return { events: [] };
	}

	return { events };
}
