// src/routes/events/[slug]/+page.server.js
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;

	const { data: event, error: fetchError } = await supabase
		.from('events')
		.select('*')
		.eq('slug', slug)
		.single();

	if (fetchError) {
		console.error('❌ Fout bij ophalen van evenement:', fetchError.message);
		throw error(500, 'Kon evenement niet laden.');
	}

	if (!event) {
		throw error(404, 'Evenement niet gevonden');
	}

	return { event };
}
