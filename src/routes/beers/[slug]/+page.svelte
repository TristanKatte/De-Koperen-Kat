<script lang="ts">
  export let beer;
</script>

<article class="beer-detail">
  <h1>{beer.data.title[0]?.text}</h1>
  <img src={beer.data.image.url} alt={beer.data.title[0]?.text} />

  <ul class="beer-info">
    <li><strong>Type:</strong> {beer.data.beer_type}</li>
    <li><strong>Alcoholpercentage:</strong> {beer.data.alcohol_percentage}%</li>
    <li><strong>Beschikbaar:</strong> {beer.data.available ? 'Ja' : 'Nee'}</li>
    <li><strong>EBC:</strong> {beer.data.ebc}</li>
    <li><strong>EBU:</strong> {beer.data.ebu}</li>
    <li><strong>Ideale temperatuur:</strong> {beer.data.temperature}°C</li>
  </ul>

  <section class="description">
    {@html beer.data.description[0]?.text}
  </section>
</article>

<style>
  .beer-detail {
    max-width: 800px;
    margin: 3rem auto;
    color: #fff;
    background: #152331;
    padding: 2rem;
    border-radius: 1rem;
  }

  img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .beer-info {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
  }

  .beer-info li {
    margin-bottom: 0.5rem;
  }

  .description {
    line-height: 1.6;
  }
</style>
