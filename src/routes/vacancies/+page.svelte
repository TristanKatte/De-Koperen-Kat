<script lang="ts">
	import VacancyCard from '$lib/components/molecules/VacancyCard.svelte';

  let { data } = $props();
  const vacancies = data.vacancies ?? []; 

</script>

<section class="vacature-overview">
  <h1>Vrijwilligers gezocht</h1>
  <p class="intro">
    Op het moment zitten we goed in het vaste personeel, maar hebben we altijd plek
    voor vrijwilligers die overdag willen meehelpen met hand-en-spandiensten.
  </p>

  {#if vacancies.length > 0}
    <div class="vacature-grid">
      {#each vacancies as v}
        <VacancyCard {v} />
      {/each}
    </div>
  {:else}
    <p>Er zijn op dit moment geen openstaande vrijwilligersplekken.</p>
  {/if}
</section>

<style>
  .vacature-overview {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
  }

  .intro {
    margin-bottom: 2rem;
    color: #555;
  }

  .vacature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
