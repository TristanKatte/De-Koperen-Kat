<script lang="ts">
  import { cubicOut } from 'svelte/easing';
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<section class="hero">
  {#if visible}
    <div class="fade-wrapper" in:fade={{ duration: 600 }}>
      <div class="hero-content" in:fly={{ y: 40, duration: 800, easing: cubicOut }}>
        <h1>Welkom bij onze brouwerij 🍺</h1>
        <p>Ontdek onze ambachtelijke bieren, proef de sfeer en beleef de passie achter elke slok.</p>
        <a href="/beers" class="cta">Bekijk onze bieren</a>
      </div>
    </div>
  {/if}

  <div class="hero-bg"></div>
</section>

<style>
  .hero {
    position: relative;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background: url('/images/brewery-hero.jpg') center/cover no-repeat;
    filter: brightness(0.4);
    z-index: 0;
    transform: scale(1);
    animation: zoom 15s ease-in-out infinite alternate;
  }

  @keyframes zoom {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.05);
    }
  }

  .fade-wrapper {
    position: relative;
    z-index: 1;
  }

  .hero-content {
    max-width: 600px;
    padding: 2rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: var(--font-family-headings);
    color: var(--highlight-color);
  }

  p {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .cta {
    background-color: var(--cta-buttons, #f59e0b);
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }

  .cta:hover {
    background-color: var(--highlight-color, #d97706);
  }
</style>
