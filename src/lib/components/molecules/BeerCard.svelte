<script lang="ts">
  import Button from '$lib/components/atoms/Button.svelte';
  
  let { beer, index = 0 } = $props();
</script>

<article class="beer-card" data-index={index} aria-label={`Bier: ${beer.name}`}>
  {#if beer.image_url}
    <img src={beer.image_url} alt={beer.name} />
  {:else}
    <div class="beer-placeholder" aria-hidden="true">🍺</div>
  {/if}
  <h2>{beer.name}</h2>
  <p class="type">{beer.beer_type}</p>
  {#if beer.alcohol_percentage}<p>Alcohol: {beer.alcohol_percentage}%</p>{/if}
  {#if beer.taste}<p>Smaakprofiel: {beer.taste}</p>{/if}
  <Button href={`/bieren/${beer.slug}`} label="Meer informatie" />
</article>

<style>
  .beer-card {
    background: var(--background-color);
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: auto;
  }

  .beer-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: contain;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .beer-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 220px;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .type {
    font-style: italic;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.95rem;
    line-height: 1.5;
  }

  @container beers-overview (min-width: 48rem) {
    .beer-card {
      padding: 2rem 1.5rem;
      min-height: 420px;
    }
  }
</style>
