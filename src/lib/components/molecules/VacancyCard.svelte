<script lang="ts">
  export let v;
</script>

<article class="vacancy-card">
  {#if v.image_url}
    <img class="thumb" src={v.image_url} alt={v.title} />
  {/if}

  <div class="content">
    <h2>{v.title}</h2>
    <p class="intro">{v.description}</p>
    <a class="meer" href={`/vacatures/${v.slug}`}>Bekijk vacature →</a>
  </div>
</article>

<style>
.vacancy-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  height: 100%; 
}

.vacancy-card:nth-child(1) {
  grid-column: span 1;
}

.vacancy-card .thumb {
  width: 100%;
  height: 250px; 
  object-fit: cover;
  border-radius: 0.6rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 0.95;
}

h2 {
  margin: 0;
  font-size: 1.2rem;
}

.intro {
  color: #555;
}

.meer {
  margin-top: auto;
  font-weight: bold;
  color: #c4661f;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .vacancy-card {
    flex-direction: column;
    align-items: stretch;
    text-align: left;
  }

  .vacancy-card .thumb {
    height: 150px; /* iets kleiner op mobiel */
  }
}
</style>
