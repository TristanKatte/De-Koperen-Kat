<script lang="ts">
	import { onMount } from 'svelte';
	import { createClient } from '$lib/prismicio'; // jouw prismicio.ts

	// ✅ Type definitie voor een Beer
	interface Beer {
		title: string;
		slug?: string; // <-- slug is nu optioneel
		description: any;
		beer_type: string;
		alcohol_percentage: number;
		ebc?: number;
		ebu?: number;
		temperature?: number;
		available: boolean;
		image?: { url: string };
	}

	// Array van beers
	let beers: Beer[] = [];
	let loading = true;

	onMount(async () => {
		try {
			const client = createClient();

			// Haal alle beers op
			const response = await client.getAllByType('beer');
			// 'beer' = de API ID van je Reusable Type

			beers = response.map((item) => ({
				title: item.data.title,
				slug: item.uid ?? '', // <-- fallback naar lege string
				description: item.data.description,
				beer_type: item.data.beer_type,
				alcohol_percentage: item.data.alcohol_percentage,
				ebc: item.data.ebc,
				ebu: item.data.ebu,
				temperature: item.data.temperature,
				available: item.data.available,
				image: item.data.image?.url ? { url: item.data.image.url } : undefined
			}));
		} catch (err) {
			console.error('Error fetching beers:', err);
		} finally {
			loading = false;
		}
	});

	// Functie om Rich Text JSON om te zetten naar HTML
	function renderRichText(richText: any) {
		if (!richText || !richText.length) return '';
		return richText.map((block: any) => block.text || '').join('<br>');
	}
</script>

<main>
	{#if loading}
		<p>Loading beers...</p>
	{:else if beers.length === 0}
		<p>No beers found.</p>
	{:else}
		<div class="beer-list">
			{#each beers as beer}
				<article class="beer-card">
					<h2>{beer.title}</h2>
					<p>Type: {beer.beer_type}</p>
					<p>Alcohol: {beer.alcohol_percentage}%</p>
					{#if beer.ebc}
						<p>EBC: {beer.ebc}</p>
					{/if}
					{#if beer.ebu}
						<p>EBU: {beer.ebu}</p>
					{/if}
					{#if beer.temperature}
						<p>Ideal Temp: {beer.temperature}°C</p>
					{/if}
					<p>Available: {beer.available ? 'Yes' : 'No'}</p>

					{#if beer.image}
						<img src={beer.image.url} alt={beer.title} />
					{/if}

					<div class="description">
						{@html renderRichText(beer.description)}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</main>

<style>
	.beer-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		padding: 2rem;
	}

	.beer-card {
		background: #152331;
		color: white;
		padding: 1rem;
		border-radius: 12px;
	}

	.beer-card img {
		width: 100%;
		border-radius: 8px;
		margin-top: 1rem;
	}

	.description {
		margin-top: 1rem;
	}
</style>
