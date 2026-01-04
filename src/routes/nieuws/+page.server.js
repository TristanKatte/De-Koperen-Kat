// +page.server.js
import { supabase } from '$lib/supabaseClient.js';

export async function load() {
  // Haal de evenementen op uit de 'news-events' tabel
  const { data: events, error } = await supabase
    .from('news_events')
    .select('*')
    .order('date', { ascending: true }); // op datum gesorteerd

  if (error) {
    console.error('Error loading events:', error);
    return { events: [] };
  }

  return { events };
}
