<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // ✅ Type definitie voor een Beer
  interface Beer {
    name: string;
    slug: string;
    description: any;
    beer_type: string;
    alcohol_percentage: number;
    available: boolean;
    image?: { data?: { attributes: { url: string } } };
  }

  let beer: Beer | null = null;
  let slug = '';

  const API_TOKEN = '7bb4adb504c6e78843d9e328b9cdcd3829d45f77a14a7ed30cd554c9dd86978be8c6eb00ecc5f114892173980c9d0b002441fedce04a2035adaaf7604cf182df90788444c6be950ca612a07ac248892285d092d2e8a428ea6a43d1759268d2be141ba1374c639dc3d974d40d1510d98a494c44cde0741da61ced9578bfca091c';
  const API_BASE = 'http://localhost:1337';

  // Haal slug uit de route
  $: {
  if ($page.params.slug) {
    slug = $page.params.slug;
  }
}


  onMount(async () => {
    if (!slug) return;

    try {
      const res = await fetch(`${API_BASE}/api/beers?filters[slug][$eq]=${slug}&populate=image`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      });

      const data = await res.json();
      beer = data.data[0]?.attributes || null;

    } catch (err) {
      console.error('Error fetching beer:', err);
      console.log(data);
    }
  });

  // Functie om Strapi Rich Text JSON naar HTML te renderen
  function renderRichText(richText: any) {
    if (!richText || !richText.content) return '';
    return richText.content
      .map((block: any) => block.content.map((c: any) => c.text).join(''))
      .join('<br>');
  }
</script>

<main>
  {#if !beer}
    <p>Loading beer...</p>
  {:else}
    <article class="beer-card">
      <h1>{beer.name}</h1>
      <p>Type: {beer.beer_type}</p>
      <p>Alcohol: {beer.alcohol_percentage}%</p>
      <p>Available: {beer.available ? 'Yes' : 'No'}</p>

      {#if beer.image?.data}
        <img src={beer.image?.data?.attributes?.url ?? '/placeholder.jpg'} alt={beer.name} />

      {/if}

      <div class="description">
        {@html renderRichText(beer.description)}
      </div>
    </article>
  {/if}
</main>

<style>
  .beer-card {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #152331;
    border-radius: 12px;
    color: white;
  }

  .beer-card img {
    width: 100%;
    border-radius: 8px;
    margin-top: 1rem;
  }

  .description {
    margin-top: 1rem;
  }
</style>
