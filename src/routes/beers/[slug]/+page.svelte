<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Button from '$lib/components/atoms/Button.svelte';

	gsap.registerPlugin(ScrollTrigger);

	export let data;
	const beer = data?.beer;

	onMount(() => {
		if (!beer) return;

		const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });
		tl.from('.beer-image', { opacity: 0, y: 40 })
			.from('.beer-title', { opacity: 0, y: 20 }, '-=0.5')
			.from('.beer-meta span', { opacity: 0, y: 10, stagger: 0.1 }, '-=0.3')
			.from('.beer-description', { opacity: 0, y: 20 }, '-=0.2');

		// Parallax-effect bij scrollen
		gsap.to('.beer-image', {
			yPercent: 10,
			ease: 'none',
			scrollTrigger: {
				trigger: '.beer-image',
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});
	});
</script>

{#if !beer}
	<section class="not-found">
		<h1>Bier niet gevonden 🍺</h1>
		<p>Dit bier bestaat niet of is niet meer beschikbaar.</p>
		<Button href="/beers" label="Terug naar alle bieren" />
	</section>
{:else}
	<article class="beer-detail" aria-labelledby="beer-title">
		<header>
			<img
				src={beer.image_url}
				alt={`Afbeelding van ${beer.name}`}
				class="beer-image"
				loading="lazy"
			/>
			<h1 id="beer-title" class="beer-title">{beer.name}</h1>
			<div class="beer-meta">
				<span><strong>Stijl:</strong> {beer.beer_type}</span>
				<span><strong>Alcoholpercentage:</strong> {beer.alcohol_percentage}%</span>
			</div>
		</header>

		<section class="beer-description">
			<h2>Beschrijving</h2>
			<p>{beer.description}</p>
		</section>

		{#if beer.taste}
			<section class="beer-flavour">
				<h2>Smaakprofiel</h2>
				<p>{beer.taste}</p>
			</section>
		{/if}

		<footer class="beer-footer">
			<Button href="/beers" label="← Terug naar overzicht" />
			<Button href="/contact" label="Waar te koop?" />
		</footer>
	</article>
{/if}

<style>
	/* Algemene layout */
	.beer-detail {
		max-width: 900px;
		margin: 0 auto;
		padding: 5rem 1.5rem;
		color: var(--text-color, #2b2b2b);
	}

	.not-found {
		text-align: center;
		padding: 5rem 1.5rem;
	}

	/* Header en afbeelding */
	header {
		text-align: center;
		margin-bottom: 3rem;
	}
	.beer-image {
		width: 100%;
		max-height: 450px;
		object-fit: contain;
		border-radius: 1rem;
		margin-bottom: 2rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease;
	}
	.beer-image:hover {
		transform: scale(1.02);
	}

	.beer-title {
		font-size: 2.5rem;
		color: #4b2e05;
		margin-bottom: 0.5rem;
		font-weight: 700;
	}

	.beer-meta {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 1.125rem;
		color: #555;
	}

	/* Beschrijving */
	.beer-description,
	.beer-flavour {
		margin-bottom: 3rem;
	}
	h2 {
		font-size: 1.75rem;
		color: #4b2e05;
		margin-bottom: 0.75rem;
	}
	p {
		line-height: 1.7;
		font-size: 1.125rem;
		color: #333;
	}

	/* Footer */
	.beer-footer {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}

	/* Responsive */
	@media (min-width: 768px) {
		.beer-meta {
			flex-direction: row;
			justify-content: center;
			gap: 2rem;
		}
	}
</style>
