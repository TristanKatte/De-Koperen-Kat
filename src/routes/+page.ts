import { createClient } from '$lib/prismicio';

export async function load() {
  const client = createClient();

  const beers = await client.getAllByType('bieren', {
    fetch: [
      'data.title',
      'bier.slug',
      'bier.image',
      'bier.beer_type',
      'bier.alcohol_percentage',
      'bier.available',
      'bier.ebc',
      'bier.ebu',
      'bier.temperature'
    ],
    orderings: { field: 'my.bier.title', direction: 'asc' }
  });

  return { beers };
}
