<script lang="ts">
  import { createClient } from '$lib/prismicio';
  import { onMount } from 'svelte';

  let beers = [];
  let events = [];

  onMount(async () => {
    const client = createClient();
    beers = await client.getAllByType('beer');
    events = await client.getAllByType('event');
  });
</script>

<main>
  <h1>Bieren</h1>
  {#each beers as beer}
    <article>
      <h2>{beer.data.title}</h2>
      <p>{beer.data.description[0]?.text}</p>
      <p>Alcohol: {beer.data.alcohol_percentage}%</p>
    </article>
  {/each}

  <h1>Evenementen</h1>
  {#each events as event}
    <article>
      <h2>{event.data.title}</h2>
      <p>{event.data.date}</p>
      <p>{event.data.location}</p>
    </article>
  {/each}
</main>
