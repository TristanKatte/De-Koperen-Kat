<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';

	interface Props {
		beers?: any[];
	}

	let { beers = [] }: Props = $props();
</script>

<section class="beers-section" aria-labelledby="beers-title">
	<h2 id="beers-title">Onze Bieren</h2>

	<div class="grid">
		{#each beers.slice(0, 8) as beer}
			<article class="beer-card">
				{#if beer.image_url}
					<img src={beer.image_url} alt={beer.name} />
				{/if}

				<div class="beer-content">
					<h3>{beer.name}</h3>
					<p class="type">{beer.beer_type}</p>
					<p class="alcohol">Alcohol: {beer.alcohol_percentage}%</p>
					<p class="taste">{beer.taste}</p>
				</div>

				<div class="card-button">
					<Button href={`/beers/${beer.slug}`} label="Meer informatie" />
				</div>
			</article>
		{/each}
	</div>
	<div class="centered-button">
		<Button href="/beers" label="Bekijk alle bieren" />
	</div>
</section>

<style>
	.beers-section {
		background-color: var(--background-alt);
		color: #f5f5f0;
		padding: 5rem 1.5rem;
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}

	h2 {
		font-size: 2.25rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 2.5rem;
		color: #f5f5f0;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		width: 100%;
		margin: 0 auto 2rem;
		box-sizing: border-box;
	}

	/* --- Bierkaart --- */
	.beer-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between; /* knop naar onder */
		min-height: 420px;
		background: var(--background-color);
		color: var(--text-color);
		border: 3px solid var(--background-color-alt);
		border-radius: 1rem;
		padding: 1.75rem;
		text-align: left;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			background 0.25s ease;
	}

	/* Hover effect */
	.beer-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
	}

	/* Focus-within */
	.beer-card:focus-within {
		outline: 3px solid #ffd699;
		outline-offset: 4px;
	}

	.card-button {
		margin-top: auto; /* duwt knop naar onder */
		margin-top: 2.5rem;
	}

	/* --- Afbeelding --- */
	.beer-card img {
		width: 100%;
		height: auto;
		max-height: 350px;
		object-fit: contain;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
		background: var(--background-color-alt);
	}

	/* --- Tekst --- */
	.beer-content h3 {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 0.4rem;
		color: var(--text-color);
	}

	.beer-content p {
		margin: 0.2rem 0;
		line-height: 1.4;
		color: var(--text-color);
	}

	.beer-content {
		margin-bottom: 1.5rem;
	}

	.type {
		font-style: italic;
		opacity: 0.8;
	}

	.alcohol {
		font-weight: 500;
		opacity: 0.9;
	}

	/* --- Grote knop onder het grid --- */
	.centered-button {
		margin-top: 3rem;
		text-align: center;
	}

	/* --- Responsief --- */
	@media (max-width: 768px) {
		.beers-section {
			padding: 3rem 1rem;
		}

		.grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.beer-card {
			padding: 1.5rem;
			min-height: auto;
		}

		.centered-button {
			margin-top: 2.5rem;
		}
	}
</style>
