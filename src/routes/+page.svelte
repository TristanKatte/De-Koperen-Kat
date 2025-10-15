<script lang="ts">
	export let data;
	let isAdult = false;

	function confirmAge() {
		isAdult = true;
	}
</script>

{#if !isAdult}
	<div class="age-check">
		<h2>Ben je 18 jaar of ouder?</h2>
		<button on:click={confirmAge}>Ja, ik ben 18+</button>
	</div>
{:else}
	<section class="beers-section">
		<h1>Onze bieren 🍺</h1>
		<div class="beer-grid">
			{#each data.beers as beer}
				<div class="beer-card">
					<img src={beer.image_url} alt={beer.name} />
					<h2>{beer.name}</h2>
					<p class="type">{beer.beer_type}</p>
					<p class="alcohol">Alcohol: {beer.alcohol_percentage}%</p>
          <p class="taste">{beer.taste}</p>
				</div>
			{/each}
		</div>

		<h2 class="events-title">Evenementen 🎪</h2>
		<ul class="event-list">
			{#each data.events as event}
				<li>
					<strong>{event.name}</strong> — {event.date}
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style>
/* Algemene layout voor de leeftijdscheck */
.age-check {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f5f3ef;
	text-align: center;
}

.age-check h2 {
	font-size: 1.875rem; /* 3xl */
	margin-bottom: 1rem;
	font-weight: 600;
}

.age-check button {
	padding: 0.75rem 1.5rem;
	background-color: #b45309; /* amber-600 */
	color: white;
	border: none;
	border-radius: 0.75rem;
	cursor: pointer;
	font-size: 1rem;
	transition: background-color 0.3s ease;
}

.age-check button:hover {
	background-color: #92400e; /* amber-700 */
}

/* Biersectie */
.beers-section {
	padding: 2rem;
}

.beers-section h1 {
	font-size: 2.25rem; /* 4xl */
	font-weight: 700;
	margin-bottom: 1.5rem;
}

.beer-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 1.5rem;
}

@media (min-width: 768px) {
	.beer-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

.beer-card {
	background-color: var(--background-color);
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	border-radius: 1rem;
	padding: 1rem;
	text-align: left;
}

.beer-card img {
	width: 100%;
	border-radius: 0.5rem;
	margin-bottom: 0.75rem;
}

.beer-card h2 {
	font-size: 1.5rem; /* 2xl */
	font-weight: 600;
	margin-bottom: 0.25rem;
}

.beer-card .type {
	color: #4b5563; /* gray-600 */
}

.beer-card .alcohol {
	color: #6b7280; /* gray-500 */
	font-size: 0.875rem;
}

.beer-card .taste {
  color: #374151; /* gray-700 */
  font-size: 0.875rem;
  margin-top: 0.25rem;
  font-weight: 500;
  font-style: italic;
}

/* Evenementen */
.events-title {
	font-size: 2.25rem;
	font-weight: 700;
	margin-top: 3rem;
	margin-bottom: 1.5rem;
}

.event-list {
	list-style: none;
	padding: 0;
}

.event-list li {
	margin-bottom: 1rem;
}
</style>
