import { createClient } from '$lib/prismicio';

export async function load() {
  const client = createClient();
  const beers = await client.getAllByType('bieren', {
    fetchLinks: [],
  });
  return { beers };
}
