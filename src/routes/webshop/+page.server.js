import { supabase } from '$lib/supabaseClient.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // Haal producten op uit de 'products' tabel
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('title', { ascending: true }); // optioneel sorteren

  if (error) {
    console.error('Supabase error fetching products:', error);
    return { products: [] }; // fallback naar lege lijst
  }

  return {
    products
  };
}
