<script lang="ts">
  import BeerCard from '$lib/components/molecules/BeerCard.svelte';
  
  let { beers } = $props();
</script>

<section class="grid">
  {#each beers as beer, i}
    <BeerCard {beer} index={i} />
  {/each}
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }

  @container beers-overview (min-width: 48rem) {
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.5rem;
      padding: 0 1rem;
    }
  }
</style>