import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function load() {
    const today = new Date().toISOString(); // YYYY-MM-DD

    const { data: events, error } = await supabase
        .from('news-events')
        .select('*')
        .gte('date', today)   // alleen toekomstige events
        .order('date', { ascending: true }); // eerstvolgende bovenaan

    if (error) {
        console.error('Error loading events:', error);
        return { events: [] };
    }

    return { events };
}
