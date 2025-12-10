import { supabase } from '$lib/supabaseClient';

export async function load() {
    const { data: vacancies, error } = await supabase
        .from('vacancies')
        .select('*')
        .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching vacancies:', error);
        }

        return { vacancies };
}