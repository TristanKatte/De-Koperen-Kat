import { supabase } from '$lib/supabaseClient';

/** 
 * SSR-safe load function voor homepagina 
 * Haalt 'beers' en 'events' op van Supabase
 */
export const load = async () => {
    try {
        // Beers ophalen
        const { data: beers, error: beersError } = await supabase.from('beers').select('*');
        if (beersError) console.error('Error fetching beers:', beersError);

        // Events ophalen
        const { data: events, error: eventsError } = await supabase.from('events').select('*');
        if (eventsError) console.error('Error fetching events:', eventsError);

        // Fallback naar lege arrays als data niet beschikbaar is
        return {
            beers: beers || [],
            events: events || []
        };
    } catch (err) {
        // Onverwachte fouten opvangen zodat pagina niet crasht
        console.error('Unexpected error in load:', err);
        return {
            beers: [],
            events: []
        };
    }
};
