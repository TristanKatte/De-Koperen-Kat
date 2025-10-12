<script lang="ts">
  export let beers;
</script>

<section class="beer-grid">
  {#each beers as beer}
    <a href={`/bieren/${beer.uid}`} class="beer-card">
      <img src={beer.data.image.url} alt={beer.data.title[0]?.text} />
      <h2>{beer.data.title[0]?.text}</h2>
      <p>{beer.data.beer_type}</p>
    </a>
  {/each}
</section>
