<script lang="ts">
  let { partners } = $props();
</script>

<section class="partners" aria-labelledby="partners-title">
  <h2 id="partners-title">Onze partners 🤝</h2>
  <div class="partners-grid">
    {#each partners as partner}
      <article class="partner-card">
        <img src={partner.logo} alt={partner.name} />
        <p>{partner.name}</p>
        <a href={partner.url} target="_blank" rel="noopener noreferrer">
          Meer info
        </a>
      </article>
    {/each}
  </div>
</section>

<style>
  .partners {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 3rem;
    container-type: inline-size;
    container-name: partners-section;
  }
  
  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-color);
  }
  
  .partners-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    justify-items: center;
  }
  
  .partner-card {
    text-align: center;
    background: #fff;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .partner-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
  
  .partner-card img {
    max-width: 75%;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto 0.5rem;
    background-color: #fff;
  }
  
  .partner-card p {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1a1a1a;
  }
  
  .partner-card a {
    color: #c27c3a;
    text-decoration: none;
    font-size: 0.9rem;
  }
  
  .partner-card a:hover {
    text-decoration: underline;
  }
  
  /* Container queries for responsive grid */
  @container partners-section (min-width: 64rem) {
    .partners-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @container partners-section (min-width: 70rem) {
    .partners-grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
  }
</style>