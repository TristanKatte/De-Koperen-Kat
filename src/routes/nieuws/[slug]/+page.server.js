import { supabase } from '$lib/supabaseClient.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { slug } = params;

  const { data: events, error } = await supabase
    .from('news_events')
    .select('*')
    .eq('slug', slug);

  if (error) {
    console.error('Error loading event:', error);
    return { event: null };
  }

  // pak het eerste resultaat als er meerdere zijn
  const event = events[0] ?? null;

  return { event };
}
