import { supabaseServer } from '$lib/supabaseClient.server';

export const load = async () => {
  const { data: beers } = await supabaseServer.from('beers').select('*');
  const { data: events } = await supabaseServer.from('events').select('*');

  return { beers, events };
};
