import { supabaseServer } from '$lib/supabaseClient.server';

export const load = async () => {
  console.log("ENV CHECK (server):", {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "MISSING"
  });

  try {
    console.log('Fetching beers and events...');

    const { data: beers, error: beersError } = await supabaseServer
      .from('beers')
      .select('*');

    console.log('Beers:', beers, 'Error:', beersError);

    const { data: events, error: eventsError } = await supabaseServer
      .from('events')
      .select('*');

    console.log('Events:', events, 'Error:', eventsError);

    if (beersError || eventsError) {
      throw new Error('Supabase query failed');
    }

    return {
      beers: beers || [],
      events: events || []
    };
  } catch (err) {
    console.error('Unexpected load error:', err);
    return { beers: [], events: [] };
  }
};



