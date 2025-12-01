import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	try {
		// beers ophalen
		const { data: beers, error: beersError } = await supabase.from('beers').select('*');
		// events ophalen
		const { data: events, error: eventsError } = await supabase.from('events').select('*');

		// errors loggen, maar niet crashen
		if (beersError || eventsError) {
			console.error('Supabase error:', beersError || eventsError);
		}

		// fallback: lege arrays als data niet beschikbaar
		return {
			beers: beers || [],
			events: events || []
		};
	} catch (err) {
		// onverwachte fouten opvangen
		console.error('Unexpected error in load:', err);
		return {
			beers: [],
			events: []
		};
	}
};
