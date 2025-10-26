<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Button from '$lib/components/atoms/Button.svelte';

	gsap.registerPlugin(ScrollTrigger);

	export let data;
	const beers = data?.beers || [];

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		gsap.utils.toArray<HTMLElement>('.beer-card').forEach((el, i) => {
			gsap.from(el, {
				scrollTrigger: {
					trigger: el,
					start: 'top 90%',
					toggleActions: 'play reverse play reverse'
				},
				opacity: 0,
				y: 40,
				scale: 0.95,
				duration: 0.8,
				ease: 'power3.out',
				delay: i * 0.1
			});
		});
	});
</script>

<section class="beers-overview" aria-labelledby="beers-title">
	<h1 id="beers-title">Onze Bieren</h1>

	{#if beers.length > 0}
		<div class="grid">
			{#each beers as beer}
				<article class="beer-card"  aria-label={`Bier: ${beer.name}`}>
					{#if beer.image_url}
						<img src={beer.image_url} alt={beer.name} />
					{:else}
						<div class="beer-placeholder" aria-hidden="true">🍺</div>
					{/if}
					<h2>{beer.name}</h2>
					<p class="type">{beer.beer_type}</p>
					{#if beer.alcohol_percentage}<p>Alcohol: {beer.alcohol_percentage}%</p>{/if}
					{#if beer.taste}<p>Smaakprofiel: {beer.taste}</p>{/if}
				</article>
			{/each}
		</div>
	{:else}
		<p class="empty-message" role="status">
			Er zijn momenteel geen bieren beschikbaar. Probeer het later opnieuw 🍻
		</p>
	{/if}

    <Button href="/" label="Terug naar de homepage" />
</section>

<style>
	.beers-overview {
		padding: 5rem 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	
    h1 {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 3rem;
	}
	
    .grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}
	
    .beer-card {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 1rem;
		padding: 1.5rem;
		text-align: left;
		transition: transform 0.3s ease;
	}
	
    .beer-card:hover {
		transform: translateY(-4px);
	}
	
    img {
		width: 100%;
		max-height: 220px;
		object-fit: contain;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}
	
    .beer-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 220px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
		font-size: 3rem;
	}

	.empty-message {
		text-align: center;
		margin-top: 3rem;
		font-size: 1.2rem;
		color: #ccc;
	}
</style>
