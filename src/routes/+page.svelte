<script lang="ts">
	import Hero from '$lib/components/organisms/Hero.svelte';
	import { supabase } from '$lib/supabaseClient'; // ← jouw Supabase client
	export let data;

	const beers = data.beers || [];
	const events = data.events || [];

	let beerCarousel: HTMLDivElement;
	let eventCarousel: HTMLDivElement;
	let beerIndex = 0;
	let eventIndex = 0;

	// Scroll functionaliteit
	function scrollNext(carousel: HTMLDivElement, indexVar: 'beerIndex' | 'eventIndex', total: number) {
		if (indexVar === 'beerIndex') beerIndex = Math.min(beerIndex + 1, total - 1);
		else eventIndex = Math.min(eventIndex + 1, total - 1);

		carousel.scrollTo({
			left: (indexVar === 'beerIndex' ? beerIndex : eventIndex) * carousel.clientWidth,
			behavior: 'smooth'
		});
	}

	function scrollPrev(carousel: HTMLDivElement, indexVar: 'beerIndex' | 'eventIndex', total: number) {
		if (indexVar === 'beerIndex') beerIndex = Math.max(beerIndex - 1, 0);
		else eventIndex = Math.max(eventIndex - 1, 0);

		carousel.scrollTo({
			left: (indexVar === 'beerIndex' ? beerIndex : eventIndex) * carousel.clientWidth,
			behavior: 'smooth'
		});
	}

	// === Supabase formulierverwerking ===
	let name = '';
	let email = '';
	let date = '';
	let guests: number | null = null;
	let success = false;
	let error: string | null = null;

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = null;
		success = false;

		const { data: booking, error: insertError } = await supabase
			.from('bookings')
			.insert([{ name, email, date, guests }]);

		if (insertError) {
			error = 'Er ging iets mis bij het reserveren. Probeer het later opnieuw.';
			console.error(insertError);
			return;
		}

		success = true;
		name = '';
		email = '';
		date = '';
		guests = null;
	}
</script>

<!-- 🌅 Hero -->
<Hero />

<!-- 🍺 Biersectie -->
<section class="beers-section" aria-labelledby="beers-title">
	<h2 id="beers-title">Onze Bieren</h2>
	<div class="carousel-wrapper">
		<button class="scroll-btn prev" on:click={() => scrollPrev(beerCarousel, 'beerIndex', beers.length)} aria-label="Vorige bieren">‹</button>

		<div class="beer-carousel" bind:this={beerCarousel} aria-label="Bier selectie">
			{#each beers as beer}
				<article class="beer-card">
					<img src={beer.image_url} alt={beer.name} />
					<h3>{beer.name}</h3>
					<p class="type">{beer.beer_type}</p>
					<p class="alcohol">Alcohol: {beer.alcohol_percentage}%</p>
					<p class="taste">{beer.taste}</p>
				</article>
			{/each}
		</div>

		<button class="scroll-btn next" on:click={() => scrollNext(beerCarousel, 'beerIndex', beers.length)} aria-label="Volgende bieren">›</button>
	</div>
</section>

<!-- 🎪 Evenementen -->
<section class="events-section" aria-labelledby="events-title">
	<h2 id="events-title">Evenementen</h2>
	<div class="carousel-wrapper">
		<button class="scroll-btn prev" on:click={() => scrollPrev(eventCarousel, 'eventIndex', events.length)} aria-label="Vorige evenementen">‹</button>

		<div class="event-carousel" bind:this={eventCarousel} aria-label="Evenementen">
			{#each events as event}
				<article class="event-card">
					<h3>{event.name}</h3>
					<p>
						{new Date(event.date).toLocaleDateString('nl-NL', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						})}
					</p>
				</article>
			{/each}
		</div>

		<button class="scroll-btn next" on:click={() => scrollNext(eventCarousel, 'eventIndex', events.length)} aria-label="Volgende evenementen">›</button>
	</div>
</section>

<!-- 🍻 Proeflokaal boeken -->
<section class="tasting-section" aria-labelledby="tasting-title">
	<h2 id="tasting-title">Boek een Proeflokaal 🍺</h2>
	<p class="tasting-description">
		Beleef onze bieren in een unieke sfeer. Reserveer jouw plek in ons proeflokaal en geniet van een rondleiding,
		proeverij en ambachtelijke hapjes.
	</p>

	<form class="tasting-form" on:submit={handleSubmit} aria-describedby="tasting-instructions">
		<p id="tasting-instructions" class="sr-only">
			Vul het formulier in om een reservering te maken in het proeflokaal.
		</p>

		<div class="form-group">
			<label for="name">Naam</label>
			<input id="name" type="text" bind:value={name} required placeholder="Je naam" />
		</div>

		<div class="form-group">
			<label for="email">E-mail</label>
			<input id="email" type="email" bind:value={email} required placeholder="je@email.com" />
		</div>

		<div class="form-group">
			<label for="date">Datum</label>
			<input id="date" type="date" bind:value={date} required />
		</div>

		<div class="form-group">
			<label for="guests">Aantal personen</label>
			<input id="guests" type="number" bind:value={guests} min="1" max="20" required />
		</div>

		<button type="submit" class="btn btn--primary">Reserveer nu</button>

		{#if success}
			<p class="success-message" role="status">Bedankt! Je reservering is ontvangen 🍻</p>
		{/if}
		{#if error}
			<p class="error-message" role="alert">{error}</p>
		{/if}
	</form>
</section>

<style>

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 50%; /* zelfde breedte als andere secties */
  margin: 0 auto 5rem; /* uitlijning met secties erboven/onder */
}

	.scroll-btn {
		background: var(--cta-buttons);
		color: #fff;
		border: none;
		font-size: 2rem;
		width: 3rem;
		height: 3rem;
		cursor: pointer;
		z-index: 5;
		border-radius: 5%;
		margin: 0 0.5rem;
	}

	.beer-carousel,
	.event-carousel {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		gap: 1rem;
		padding: 1rem 0;
		scrollbar-width: none;
		flex: 1;
	}

	.beer-carousel::-webkit-scrollbar,
	.event-carousel::-webkit-scrollbar {
		display: none;
	}

	.beer-card,
	.event-card {
		flex: 0 0 250px;
		scroll-snap-align: start;
		background: rgba(255, 255, 255, 0.05);
		padding: 1.5rem;
		border-radius: 1rem;
		text-align: center;
		color: var(--text-color);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.beer-card:hover,
	.event-card:hover {
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

	h2 {
		font-size: 2.25rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 2rem;
		font-family: var(--font-family-headings);
	}

	.events-section {
		background: rgba(255, 255, 255, 0.03);
		padding: 5rem 1rem;
	}

	/* === Proeflokaal === */
	.tasting-section {
		background: rgba(255, 255, 255, 0.03);
		padding: 5rem 1.5rem;
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.tasting-description {
		max-width: 700px;
		margin: 0 auto 3rem;
		font-size: 1.125rem;
		color: var(--text-color);
		line-height: 1.6;
	}

	.tasting-form {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		max-width: 700px;
		margin: 0 auto;
		text-align: left;
	}

	label {
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--text-color);
	}

	input {
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-color);
		font-size: 1rem;
	}

	input:focus-visible {
		outline: 2px solid var(--cta-buttons);
		outline-offset: 2px;
	}

	.btn {
		grid-column: 1 / -1;
		justify-self: center;
		padding: 1rem 2rem;
		border-radius: 2rem;
		font-weight: 600;
		background: var(--cta-buttons);
		color: #fff;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		transition: background 0.3s ease, transform 0.2s ease;
	}

	.btn:hover,
	.btn:focus-visible {
		background: #d24e0f;
		transform: translateY(-2px);
	}

	.success-message {
		color: green;
		text-align: center;
		margin-top: 1rem;
	}

	.error-message {
		color: red;
		text-align: center;
		margin-top: 1rem;
	}
</style>
