<script lang="ts">
  import CounterCard from '$lib/components/molecules/CounterCard.svelte';
  
  let { counters } = $props();
</script>

<section class="counters" aria-label="Statistieken">
  <div class="counters-grid">
    {#each counters as counter}
      <CounterCard value={counter.value} label={counter.label} />
    {/each}
  </div>
</section>

<style>
  .counters {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 3rem;
    container-type: inline-size;
    container-name: counters-section;
  }
  
  .counters-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    justify-items: center;
  }
  
  /* Container queries for responsive grid */
  @container counters-section (min-width: 64rem) {
    .counters-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }
  
  @container counters-section (min-width: 70rem) {
    .counters-grid {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 2.95rem;
    }
  }
</style>
