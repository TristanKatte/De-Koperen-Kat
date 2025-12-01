import { supabase } from '$lib/supabaseClient';

export const load = async () => {
  const { data: beers, error: beersError } = await supabase.from('beers').select('*');
  const { data: events, error: eventsError } = await supabase.from('events').select('*');

  if (beersError || eventsError) console.error('Error loading data:', beersError || eventsError);

  return {
    beers: beers || [],
    events: events || []
  };
};
