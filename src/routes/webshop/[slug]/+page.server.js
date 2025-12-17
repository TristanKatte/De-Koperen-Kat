import { supabase } from '$lib/supabaseClient.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { slug } = params;

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error loading product:', error);
        return { product: null };
    }

    return { product };
}