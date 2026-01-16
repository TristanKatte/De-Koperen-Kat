<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '$lib/components/atoms/Button.svelte';
  import BeerGrid from '$lib/components/organisms/BeerGrid.svelte';
  import EmptyState from '$lib/components/molecules/EmptyState.svelte';

  let { data } = $props();
  const beers = data?.beers || [];

  onMount(async () => {
    if (typeof window === 'undefined') return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.utils.toArray<HTMLElement>('.beer-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
      });
    });
  });
</script>

<svelte:head>
  <title>Onze Bieren</title>
</svelte:head>

<section class="beers-overview" aria-labelledby="beers-title">
  <h1 id="beers-title">Onze Bieren</h1>

  {#if beers.length > 0}
    <BeerGrid {beers} />
  {:else}
    <EmptyState 
      message="Er zijn momenteel geen bieren beschikbaar. Probeer het later opnieuw" 
    />
  {/if}

  <div class="button-container">
    <Button href="/" label="Terug naar de homepage" />
  </div>
</section>

<style>
  section {
    background-color: var(--background-alt);
    color: var(--text-color);
    padding: 4rem 1rem 5rem;
    container-type: inline-size;
    container-name: beers-overview;
  }

  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--text-color);
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    padding: 0 1rem;
  }

  @container beers-overview (min-width: 48rem) {
    section {
      padding: 5rem 1.5rem 6rem;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    .button-container {
      margin-top: 4rem;
    }
  }
</style>