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

<section class="beers-overview" aria-labelledby="beers-title">
	<h1 id="beers-title">Onze Bieren</h1>

	{#if beers.length > 0}
		<div class="grid">
			{#each beers as beer}
				<article class="beer-card" aria-label={`Bier: ${beer.name}`}>
					{#if beer.image_url}
						<img src={beer.image_url} alt={beer.name} />
					{:else}
						<div class="beer-placeholder" aria-hidden="true">🍺</div>
					{/if}
					<h2>{beer.name}</h2>
					<p class="type">{beer.beer_type}</p>
					{#if beer.alcohol_percentage}<p>Alcohol: {beer.alcohol_percentage}%</p>{/if}
					{#if beer.taste}<p>Smaakprofiel: {beer.taste}</p>{/if}
					<Button href={`/beers/${beer.slug}`} label="Meer informatie" />
				</article>
			{/each}
		</div>
	{:else}
		<p class="empty-message" role="status">
			Er zijn momenteel geen bieren beschikbaar. Probeer het later opnieuw 🍻
		</p>
	{/if}

	<div class="button-container">
		<Button href="/" label="Terug naar de homepage" />
	</div>
</section>

<style>
	section {
		background-color: var(--background-alt);
		color: var(--text-color);
		padding: 5rem 1.5rem 6rem;
	}

	h1 {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 3rem;
        color: #f5f5f0;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
        color: var(--text-color);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2.5rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.beer-card {
		background: var(--background-color);
		border-radius: 1rem;
		padding: 2rem 1.5rem;
		text-align: left;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		min-height: 420px;
	}

	.beer-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	}

	img {
		width: 100%;
		height: 220px;
		object-fit: contain;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	.beer-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 220px;
		width: 100%;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.type {
		font-style: italic;
		color: #e3d7c1;
		margin-bottom: 0.5rem;
	}

	p {
		margin-bottom: 0.95rem;
		line-height: 1.5;
	}

	.empty-message {
		text-align: center;
		margin-top: 3rem;
		font-size: 1.2rem;
		color: #ccc;
	}

	/* Nieuwe container voor de knop onder het grid */
	.button-container {
		display: flex;
		justify-content: center;
		margin-top: 4rem;
		padding: 0 1rem;
	}

	/* 📱 Mobielvriendelijke aanpassingen */
	@media (max-width: 768px) {
		section {
			padding: 4rem 1rem 5rem;
		}

		h1 {
			font-size: 2rem;
			margin-bottom: 2rem;
		}

		.grid {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 0;
		}

		.beer-card {
			padding: 1.5rem;
			min-height: auto;
		}

		.button-container {
			margin-top: 3rem;
		}
	}
</style>
