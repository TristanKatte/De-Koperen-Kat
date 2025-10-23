<script lang="ts">
	import Hero from '$lib/components/organisms/Hero.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	export let data;
	const beers = data.beers || [];
	const events = data.events || [];

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

		const { error: insertError } = await supabase
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

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		// Hero animatie
		gsap.from('.hero__content', {
			scrollTrigger: {
				trigger: '.hero',
				start: 'top 80%',
				toggleActions: 'play reverse play reverse'
			},
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power3.out'
		});

		// Bierkaarten
		gsap.utils.toArray<HTMLElement>('.beer-card').forEach((el, i) => {
			gsap.from(el, {
				scrollTrigger: {
					trigger: el,
					start: 'top 90%',
					toggleActions: 'play reverse play reverse'
				},
				opacity: 0,
				y: 30,
				scale: 0.95,
				duration: 0.7,
				ease: 'elastic.out(1, 0.4)',
				delay: i * 0.1
			});
		});

		// Eventkaarten
		gsap.utils.toArray<HTMLElement>('.event-card').forEach((el, i) => {
			gsap.from(el, {
				scrollTrigger: {
					trigger: el,
					start: 'top 90%',
					toggleActions: 'play reverse play reverse'
				},
				opacity: 0,
				y: 30,
				scale: 0.95,
				duration: 0.7,
				ease: 'elastic.out(1, 0.4)',
				delay: i * 0.1
			});
		});

		// Formulier
		gsap.utils
			.toArray<HTMLElement>('.tasting-form .form-group, .tasting-form button')
			.forEach((el, i) => {
				gsap.from(el, {
					scrollTrigger: {
						trigger: el,
						start: 'top 90%',
						toggleActions: 'play reverse play reverse'
					},
					opacity: 0,
					y: 20,
					duration: 0.5,
					ease: 'power3.out',
					delay: i * 0.1
				});
			});

		// About-sectie animatie (h2, h3, p) met stagger
		const aboutElements = document.querySelectorAll(
			'.about-section h2, .about-section h3, .about-section p'
		);
		aboutElements.forEach((el) => {
			const split = new SplitText(el, { type: 'chars, words' });
			gsap.from(split.chars, {
				scrollTrigger: {
					trigger: el,
					start: 'top 80%',
					toggleActions: 'play reverse play reverse'
				},
				opacity: 0,
				y: 30,
				scale: 0.8,
				stagger: 0.02,
				duration: 0.6,
				ease: 'back.out(1.2)'
			});
		});
	});
</script>

<!-- Hero -->
<Hero />

<!-- About -->
<section class="about-section" aria-labelledby="about-title">
	<h2 id="about-title">Over Stadsbrouwerij De Koperen Kat</h2>

	<h3>Wie zijn we?</h3>
	<p>
		Wij zijn De Koperen Kat. Een Eigentijdse, Eigenwijze, oudste Stadsbrouwerij sinds 2011 in het
		mooie Delft. We zijn een authentieke ‘Craft Brewery’ met de focus op kwaliteitsbieren.
	</p>

	<h3>Wat doen we?</h3>
	<p>
		We maken op eigen wijze, volgens eigen receptuur kwaliteitsbieren. We hebben maar liefst 18
		soorten, waarvan de herfstbock zelfs is uitgeroepen tot Lekkerste van Nederland!
	</p>

	<h3>Waarom doen we het?</h3>
	<p>
		We willen de oude historie van Delft als grootste bierbrouwstad van Europa weer nieuw leven
		inblazen. In de 16de eeuw waren er meer dan 250, maar na de sluiting van de laatste in 1922 geen
		meer.
	</p>

	<h3>Waar doen we het?</h3>
	<p>
		We zitten in een groot pand aan de Schieweg, de vroegere Kabelfabriek. Dit karakteristieke pand
		is aan de voorkant omgebouwd tot brouwerij met proeflokaal.
	</p>

	<Button href="/about" label="Lees meer over ons" />
</section>

<!-- Bier-sectie -->
<section class="beers-section" aria-labelledby="beers-title">
	<h2 id="beers-title">Onze Bieren</h2>
	<div class="grid">
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
	<div class="centered-button">
		<Button href="/beers" label="Bekijk alle bieren" />
	</div>
</section>

<!-- Evenementen -->
<section class="events-section" aria-labelledby="events-title">
	<h2 id="events-title">Agenda</h2>
	<div class="grid">
		{#each events as event}
			<article class="event-card">
				{#if event.image_url}
					<img src={event.image_url} alt={event.title} />
				{/if}
				<h3>{event.title}</h3>
				<p>
					{new Date(event.date).toLocaleDateString('nl-NL', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}
				</p>
				{#if event.time}<p>Tijd: {event.time}</p>{/if}
				<p>{event.location}</p>
				{#if event.external_url}<a
						href={event.external_url}
						target="_blank"
						rel="noopener noreferrer"
						class="event-link">Meer info</a
					>{/if}
			</article>
		{/each}
	</div>
	<div class="centered-button">
		<Button href="/events" label="Bekijk agenda" />
	</div>
</section>

<!-- Boekingsformulier -->
<section class="tasting-section" aria-labelledby="tasting-title">
	<h2 id="tasting-title">Boek een Proeflokaal 🍺</h2>
	<p class="tasting-description">
		Beleef onze bieren in een unieke sfeer. Reserveer jouw plek in ons proeflokaal en geniet van een
		rondleiding, proeverij en ambachtelijke hapjes.
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
		{#if success}<p class="success-message" role="status">
				Bedankt! Je reservering is ontvangen 🍻
			</p>{/if}
		{#if error}<p class="error-message" role="alert">{error}</p>{/if}
	</form>
</section>

<style>
	section {
		padding: 5rem 1.5rem;
	}

	section:nth-child(even) {
		background-color: #4B2E05;
		color: #F5F5F0;
	}

	section:nth-child(even) h2,
section:nth-child(even) h3,
section:nth-child(even) p,
section:nth-child(even) a {
	color: #F5F5F0;
}

	.beers-section,
	.tasting-section p  {
		color: #F5F5F0;
	}

	h2 {
		font-size: 2.25rem;
		margin-bottom: 2rem;
		text-align: center;
		font-weight: 700;
	}	

	/* About-sectie */
	.about-section {
		max-width: 700px;
		margin: 0 auto;
		text-align: left;
	}
	.about-section h2,
	.about-section h3,
	.about-section p {
		margin-bottom: 1rem;
		text-align: left;
	}
	.about-section p {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--text-color);
	}

	/* Grid-secties */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto 2rem;
	}
	.beer-card,
	.event-card {
		background: rgba(255, 255, 255, 0.05);
		padding: 1.5rem;
		border-radius: 1rem;
		text-align: left;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
	.beer-card img,
	.event-card img {
		width: 100%;
		height: auto;
		max-height: 220px;
		object-fit: contain;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
		margin-bottom: 1rem;
		display: block;
	}
	.event-link {
		color: var(--cta-buttons);
		text-decoration: underline;
		font-weight: 600;
	}

	.centered-button {
		text-align: center;
		margin-top: 1rem;
	}

	/* Boekingsformulier */
	.tasting-section {
		background: rgba(255, 255, 255, 0.03);
	}
	.tasting-description {
		text-align: center;
		margin-bottom: 2rem;
		font-size: 1.125rem;
	}
	.tasting-form {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		max-width: 650px;
		margin: 0 auto;
		text-align: left;
		
	}
	.form-group input {
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
		color: #f5f5f0;
	}
	.form-group input:focus {
		outline: 2px solid var(--cta-buttons);
		outline-offset: 2px;
	}

	.btn {
		grid-column: 1/-1;
		justify-self: center;
		padding: 1rem 2rem;
		border-radius: 2rem;
		font-weight: 600;
		background: var(--cta-buttons);
		color: #f5f5f0;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		transition:
			background 0.3s ease,
			transform 0.2s ease;
	}
	.btn:hover {
		background: #d24e0f;
		transform: translateY(-2px);
	}

	.success-message,
	.error-message {
		text-align: center;
		margin-top: 1rem;
	}
	.success-message {
		color: green;
	}
	.error-message {
		color: red;
	}

	.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
</style>
