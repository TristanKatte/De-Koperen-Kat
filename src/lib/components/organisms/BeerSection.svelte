<script lang="ts">
  import Button from '$lib/components/atoms/Button.svelte';
  export let beers: any[] = [];
</script>

<section class="beers-section" aria-labelledby="beers-title">
  <h2 id="beers-title">Onze Bieren</h2>

  <div class="grid">
    {#each beers.slice(0, 8) as beer}
      <article class="beer-card">
        {#if beer.image_url}
          <img src={beer.image_url} alt={beer.name} />
        {/if}
        <div class="beer-content">
          <h3>{beer.name}</h3>
          <p class="type">{beer.beer_type}</p>
          <p class="alcohol">Alcohol: {beer.alcohol_percentage}%</p>
          <p class="taste">{beer.taste}</p>
        </div>
      </article>
    {/each}
  </div>

  <div class="centered-button">
    <Button href="/beers" label="Bekijk alle bieren" />
  </div>
</section>

<style>
.beers-section {
  background-color: #4B2E05;
  color: #F5F5F0;
  padding: 5rem 1.5rem;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #F5F5F0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 2rem;
  box-sizing: border-box;
}

/* --- Bierkaarten --- */
.beer-card {
  background: #6b3f1a;
  color: #F5F5F0;
  border: 1px solid #ffd699;
  border-radius: 1rem;
  padding: 1.75rem;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.beer-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  background: #7f4f27; /* subtiele hover highlight */
}

.beer-card img {
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.3);
}

/* --- Tekst --- */
.beer-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: #F5F5F0;
}

.beer-content p {
  margin: 0.2rem 0;
  line-height: 1.4;
  color: #F5F5F0;
}

.type {
  font-style: italic;
  opacity: 0.8;
}

.alcohol {
  font-weight: 500;
  opacity: 0.9;
}

/* --- Button --- */
.centered-button {
  text-align: center;
}

/* --- Responsief --- */
@media (max-width: 768px) {
  .beers-section {
    padding: 3rem 1rem;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .beer-card {
    padding: 1.5rem;
  }
}
</style>
