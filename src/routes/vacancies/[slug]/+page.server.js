import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
  const { slug } = params;

  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error("Vacature error:", error);
  }

  return { vacancy: data };
}
