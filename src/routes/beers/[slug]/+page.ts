import { createClient } from '$lib/prismicio';

export async function load({ params }) {
  const client = createClient();

  // Haal het bier op via UID (= jouw slug in Prismic)
  const beer = await client.getByUID('bieren', params.slug);

  if (!beer) {
    return {
      status: 404,
      error: new Error('Beer not found')
    };
  }

  return { beer };
}
