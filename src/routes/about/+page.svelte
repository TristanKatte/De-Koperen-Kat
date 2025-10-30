<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';
	import Button from '$lib/components/atoms/Button.svelte';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	// voorbeeld partners & huurbrouwen
	const partners = [
		{ name: 'Partner 1', logo: '/images/partner1.png', url: '#' },
		{ name: 'Partner 2', logo: '/images/partner2.png', url: '#' }
	];

	const huurbrouwen = [
		{
			name: 'Brouwerij A',
			description: 'Huur onze installatie voor je eigen brouwproject!',
			url: '#'
		}
	];

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		// ─────────────────────────────
		// SplitText animatie voor teksten
		// ─────────────────────────────
		const textElements = document.querySelectorAll(
			'.about-section h2, .about-section h3, .about-section p'
		);
		textElements.forEach((el) => {
			const split = new SplitText(el, { type: 'chars, words' });
			gsap.from(split.chars, {
				scrollTrigger: {
					trigger: el,
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				},
				opacity: 0,
				y: 30,
				scale: 0.8,
				stagger: 0.015,
				duration: 0.6,
				ease: 'back.out(1.4)'
			});
		});

		// ─────────────────────────────
		// Counter animatie (TypeScript fix)
		// ─────────────────────────────
		const counters = document.querySelectorAll<HTMLElement>('.counter');
		counters.forEach((el) => {
			const targetValue = parseInt(el.dataset.value || '0', 10);
			const obj = { val: 0 };

			const tween = gsap.to(obj, {
				val: targetValue,
				duration: 1.5,
				ease: 'power1.out',
				onUpdate: () => {
					el.textContent = Math.floor(obj.val).toString();
				},
				scrollTrigger: {
					trigger: el,
					start: 'top 90%',
					toggleActions: 'play none none reverse'
				}
			});
		});
	});
</script>

<main id="main-content" class="about-section">
	<header class="about-header">
		<h1>Over De Koperen Kat</h1>
		<p class="intro">
			Wij zijn een ambachtelijke brouwerij met een passie voor bier, mensen en verhalen.
		</p>
	</header>

	<!-- Tekstsecties -->
	<section class="origin" aria-labelledby="origin-title">
		<h2 id="origin-title">Ontstaan 🍺</h2>
		<p>
			Al vanaf de middeleeuwen is bier een onderdeel van het dagelijks leven. Delft was hier in de
			16de eeuw het middelpunt van in Europa, als grootste bierbrouwstad. Meer dan 200 brouwerijen
			brouwden in de hoogtijdagen 77 miljoen liter bier, waarvan veel werd geëxporteerd naar het
			buitenland. Helaas werd door de Tachtigjarige Oorlog het begin van het einde voor Delft als
			bierbrouwstad ingeluid, waardoor in 1922 uiteindelijk de laatste brouwerij sloot. Vanaf 2011
			brouwt De Koperen Kat weer met veel trots kwaliteitsbieren in Delft. Rolf Katte heeft toen het
			idee opgepakt om de oude historie van Delft weer nieuw leven in te blazen.
		</p>
	</section>

	<section class="location" aria-labelledby="location-title">
		<h2 id="location-title">Locatie 📍</h2>
		<p>
			De Koperen Kat is te vinden in de Nederlandse Kabelfabriek. Dit karakteristieke pand aan de
			Schieweg is aan de voorkant omgebouwd tot brouwerij met proeflokaal. Mark, onze brouwmeester,
			is daar elke dag te vinden om onze bieren te brouwen. Momenteel wordt er gebrouwen in een
			installatie van 1.000L, waarbij 6 vergistingstanks van 1.000L en 2 van 2.000L aanwezig zijn.
			Hiermee brouwen we momenteel jaarlijks 70.000L. Ook maken we gebruik van een bottellijn,
			waarmee we onze opvallende etiketten op de fles kunnen plaatsen.
		</p>
	</section>

	<section class="passion" aria-labelledby="passion-title">
		<h2 id="passion-title">Onze passie ❤️</h2>
		<p>
			Elke dag worden er bij De Koperen Kat met de beste ingrediënten de mooiste kwaliteitsbieren
			gemaakt. Met veel passie voor het brouwen komen de bieren uit de tap, op fust of op fles. Door
			het gebruik van veel verschillende soorten mout, hop en gist maken we elke dag bier om van te
			genieten. Met het ruime assortiment vaste bieren, aangevuld met regelmatig limited editions,
			brengt De Koperen Kat kwaliteitsbieren met passie.
		</p>
	</section>

	<!-- Counters -->
	<section class="counters" aria-label="Bedrijf statistieken">
		<div class="counters-grid">
			<div class="counter-wrapper">
				<span class="counter" data-value="18">0</span>
				<p>Soorten bieren</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter" data-value="250">0</span>
				<p>Bezoekers per maand</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter" data-value="12">0</span>
				<p>Jaren ervaring</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter" data-value="5">0</span>
				<p>Medewerkers</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter" data-value="1">0</span>
				<p>Locatie</p>
			</div>
		</div>
	</section>

	<!-- Partners -->
	<section class="partners" aria-labelledby="partners-title">
		<h2 id="partners-title">Onze partners 🤝</h2>
		<div class="partners-grid">
			{#each partners as partner}
				<article class="partner-card">
					<img src={partner.logo} alt={partner.name} />
					<p>{partner.name}</p>
					<a href={partner.url} target="_blank" rel="noopener noreferrer">Meer info</a>
				</article>
			{/each}
		</div>
	</section>

	<!-- Huurbrouwen -->
	<section class="huurbrouwen" aria-labelledby="huurbrouwen-title">
		<h2 id="huurbrouwen-title">Huurbrouwen 🍻</h2>
		<div class="huurbrouwen-grid">
			{#each huurbrouwen as huur}
				<article class="huur-card">
					<h3>{huur.name}</h3>
					<p>{huur.description}</p>
					<a href={huur.url} target="_blank" rel="noopener noreferrer">Meer info</a>
				</article>
			{/each}
		</div>
	</section>

	<div class="button-wrapper">
		<Button href="/" label="Terug naar home" />
	</div>
</main>

<style>
	main.about-section {
		min-height: 100vh;
		padding: 5rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--accent-light, #ffe6b3);
		color: var(--text-color, #222);
	}

	.about-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	h1 {
		font-size: 2.75rem;
		margin-bottom: 1rem;
		color: var(--accent-dark, #4b2e05);
	}

	.intro {
		font-size: 1.125rem;
		max-width: 700px;
		margin: 0 auto;
		color: #444;
	}

	section {
		margin-bottom: 3rem;
		width: 100%;
		max-width: 900px;
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: var(--accent-dark, #4b2e05);
		text-align: left;
	}

	p {
		font-size: 1.125rem;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.counters-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 2rem;
		width: 100%;
		max-width: 900px;
		margin: 0 auto 3rem;
	}

	.counter-wrapper {
		text-align: center;
		background: #c27c3a;
		color: #fff;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.counter {
		font-size: 2rem;
		font-weight: 700;
		display: block;
	}

	.partners-grid,
	.huurbrouwen-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1.5rem;
		width: 100%;
	}

	.partner-card,
	.huur-card {
		background: #fff;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.partner-card img {
		max-width: 100px;
		margin-bottom: 0.5rem;
	}

	a {
		color: var(--cta-buttons, #c27c3a);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	.button-wrapper {
		margin-top: 2rem;
		text-align: center;
	}

	@media (max-width: 768px) {
		main.about-section {
			padding: 3rem 1rem;
		}

		h1 {
			font-size: 2.2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		p {
			font-size: 1rem;
		}
	}
</style>
