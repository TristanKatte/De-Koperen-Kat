<script lang="ts">
  export const ssr = false;
  import { onMount } from 'svelte';
  import Button from '$lib/components/atoms/Button.svelte';
  import Carousel from '$lib/components/organisms/Carousel.svelte';

	interface Props {
		beers?: any[];
	}

	let { beers = [] }: Props = $props();

	  let sectionEl: HTMLElement | null = null;

  onMount(async () => {
    if (!sectionEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // ⬇ Dynamisch importeren om Netlify SSR errors te voorkomen
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Alle carousel slides targetten
    const slides = sectionEl.querySelectorAll('.carousel-content .beer-layout');

    gsap.from(slides, {
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 80%',
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power2.out',
    });
  });
</script>

<section class="beers-section" bind:this={sectionEl} aria-labelledby="beers-title">
	<h2 id="beers-title">Onze Bieren</h2>

<Carousel ariaLabel="Onze bieren"  items={beers.slice(0, 8)} />

	<div class="centered-button">
		<Button href="/bieren" label="Bekijk alle bieren" />
	</div>
</section>

<style>
	.beers-section {
		background-color: var(--background-alt);
		color: #f5f5f0;
		padding: 3rem 1rem;
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		container-type: inline-size;
		container-name: beers-carousel;
	}

	h2 {
		font-size: 2rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 2.5rem;
		color: var(--text-color-alt);
	}
	
	/* --- Grote knop onder het grid --- */
	.centered-button {
		margin-top: 2.5rem;
		text-align: center;
	}

	/* --- Responsief --- */
	@container beers-carousel (min-width: 48rem) {
		.beers-section {
			padding: 4rem 1.5rem;
		}

		h2 {
			font-size: 2.5rem;
			margin-bottom: 2.5rem;
		}

		.centered-button {
			margin-top: 3rem;
		}
	}

	@container beers-carousel (min-width: 70rem) {
		.beers-section {
			padding: 5rem 2rem;
		}
	}
</style>
