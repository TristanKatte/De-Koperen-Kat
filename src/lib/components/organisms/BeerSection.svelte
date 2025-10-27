<script lang="ts">
  import Button from '$lib/components/atoms/Button.svelte';
  export let beers: any[] = [];
</script>

<section class="beers-section" aria-labelledby="beers-title">
  <h2 id="beers-title">Onze Bieren</h2>
  <div class="grid">
    {#each beers.slice(0, 8) as beer}
      <article class="beer-card">
        <img src={beer.image_url} alt={beer.name} />
        <h3>{beer.name}</h3>
        <p class="type">{beer.beer_type}</p>
        <p class="alcohol">Alcohol: {beer.alcohol_percentage}%</p>
        <p class="taste">{beer.taste}</p>
      </article>
    {/each}
  </div>
  <div class="centered-button">
    <Button href="/beers" label="Bekijk alle bieren" />
  </div>
</section>

<style>
.beers-section {
  text-align: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
}
.beer-card {
  background: var(--card-background);
  color: var(--text-color);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.beer-card img {
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.centered-button {
  text-align: center;
  margin-top: 1rem;
}
</style>
