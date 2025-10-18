<script lang="ts">
	import Hero from '$lib/components/organisms/Hero.svelte';
	export let data;

	const beers = data.beers || [];
	const events = data.events || [];
</script>

<!-- Hero sectie -->
<Hero />

<!-- Biersectie -->
<section class="beers-section">
	<h2>Onze Bieren</h2>
	<div class="beer-grid">
		{#each beers as beer}
			<div class="beer-card">
				<img src={beer.image_url} alt={beer.name} />
				<h3>{beer.name}</h3>
				<p class="type">{beer.beer_type}</p>
				<p class="alcohol">Alcohol: {beer.alcohol_percentage}%</p>
				<p class="taste">{beer.taste}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Evenementensectie -->
<section class="events-section">
	<h2>Evenementen 🎪</h2>
	<div class="event-grid">
		{#each events as event}
			<div class="event-card">
				<h3>{event.name}</h3>
				<p>{new Date(event.date).toLocaleDateString('nl-NL', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				})}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	
	/* === Beers === */
	.beers-section {
		max-width: 1200px;
		margin: 5rem auto;
		padding: 0 1rem;
	}

	.beers-section h2 {
		font-size: 2.25rem;
		font-weight: 700;
		margin-bottom: 2rem;
		text-align: center;
		font-family: var(--font-family-headings);
	}

	.beer-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.beer-card {
		background: rgba(255, 255, 255, 0.05);
		padding: 1.5rem;
		border-radius: 1rem;
		text-align: center;
		color: var(--text-color);
		backdrop-filter: blur(5px);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.beer-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}

	.beer-card img {
		width: 100%;
		height: 250px;
		object-fit: contain;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	.beer-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.beer-card .type {
		color: var(--text-color); 
	}

	.beer-card .alcohol {
		color: var(--text-color); 
		font-size: 0.9rem;
	}

	.beer-card .taste {
		color: var(--text-color); 
		font-size: 0.9rem;
		margin-top: 0.25rem;
		font-style: italic;
	}

	/* === Events === */
	.events-section {
		background: rgba(255, 255, 255, 0.03);
		padding: 5rem 1rem;
	}

	.events-section h2 {
		font-size: 2.25rem;
		font-weight: 700;
		margin-bottom: 2rem;
		text-align: center;
		color: var(--text-color);
		font-family: var(--font-family-headings);
	}

	.event-grid {
		max-width: 1000px;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.event-card {
		background: rgba(255, 255, 255, 0.05);
		padding: 1.5rem;
		border-radius: 1rem;
		text-align: center;
		color: white;
		backdrop-filter: blur(5px);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.event-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}
</style>
