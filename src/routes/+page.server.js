import { supabaseServer } from '$lib/supabaseClient.server';

export const load = async () => {
  try {
    const { data: beers, error: beersError } = await supabaseServer.from('beers').select('*');
    const { data: events, error: eventsError } = await supabaseServer.from('events').select('*');

    if (beersError || eventsError) console.error('Supabase error:', beersError || eventsError);

    return {
      beers: beers || [],
      events: events || []
    };
  } catch (err) {
    console.error('Unexpected load error:', err);
    return { beers: [], events: [] };
  }
};
