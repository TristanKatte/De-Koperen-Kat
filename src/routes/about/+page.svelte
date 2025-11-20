<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';
	import Button from '$lib/components/atoms/Button.svelte';
	import Polaroid from '$lib/components/molecules/Polaroid.svelte';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	// voorbeeld partners & huurbrouwen
	const partners = [
		{
			name: 'Partner 1',
			logo: '/images/forze-hydrogen-racing.png',
			url: 'https://forzehydrogenracing.com'
		}
	];

	const huurbrouwen = [
		{
			name: 'Brouwerij A',
			description: 'Huur onze installatie voor je eigen brouwproject!',
			url: '#'
		}
	];

	onMount(() => {
	// Check Reduced Motion Preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// ─────────────────────────────
	// SplitText tekstanimaties
	// ─────────────────────────────
	if (!prefersReducedMotion) {
		const textEls = document.querySelectorAll(
			'.about-section h2, .about-section h3, .about-section p'
		);
		textEls.forEach((el) => {
			const split = new SplitText(el, { type: 'chars, words' });
			gsap.from(split.chars, {
				opacity: 0,
				y: 25,
				stagger: 0.015,
				duration: 0.7,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 85%'
				}
			});
		});
	}

	// ─────────────────────────────
	// Counter Animaties (verbeterd)
	// ─────────────────────────────
	const counters = document.querySelectorAll<HTMLElement>('.counter');
	counters.forEach((el) => {
		const rawVal = el.dataset.value ?? "0";
		const targetVal = parseInt(rawVal.replace(/\D/g, ''), 10); // haalt + uit 250+
		const obj = { val: 0 };

		gsap.to(obj, {
			val: targetVal,
			duration: prefersReducedMotion ? 0 : 2,
			ease: 'power3.out',
			onUpdate: () => {
				el.textContent = Math.floor(obj.val).toString() + (rawVal.includes('+') ? '+' : '');
			},
			scrollTrigger: {
				trigger: el,
				start: 'top 90%',
				once: true // voorkomt reset bij scroll terug omhoog
			}
		});
	});

	// ─────────────────────────────
	// Polaroid Grid Animaties
	// ─────────────────────────────
	const polaroids = document.querySelectorAll('.polaroid');

	polaroids.forEach((card, i) => {
		// willekeurige draaiing voor speelse polaroid look
		const rotation = gsap.utils.random(-6, 6);

		gsap.from(card, {
			opacity: 0,
			y: 80,
			rotate: rotation,
			duration: prefersReducedMotion ? 0 : 1.1,
			delay: i * 0.15,
			ease: 'back.out(1.7)',
			scrollTrigger: {
				trigger: card,
				start: 'top 90%',
				once: true
			}
		});

		// Hover animatie (klein tikje omhoog)
		if (!prefersReducedMotion) {
			card.addEventListener('mouseenter', () => {
				gsap.to(card, {
					y: -12,
					rotate: rotation / 2,
					duration: 0.3,
					ease: 'power2.out'
				});
			});
			card.addEventListener('mouseleave', () => {
				gsap.to(card, {
					y: 0,
					rotate: rotation,
					duration: 0.3,
					ease: 'power2.in'
				});
			});
		}
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

	<section class="polaroids">
		<Polaroid src="/images/glas-bar.jpg" label="De Brouwerij" rotation={-5} />
		<Polaroid src="/images/bar-gloed-1.jpg" label="Proeflokaal" rotation={4} />
		<Polaroid src="/images/vergisting-ketels.jpg" label="Onze Bieren" rotation={-8} />
	</section>

	<!-- Tekstsecties -->
	<section class="origin">
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

	<section class="location">
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

	<section class="passion">
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
				<span class="counter" data-value="250+">0</span>
				<p>Vroegere brouwerijen</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter" data-value="2011">0</span>
				<p>Oudste brouwerij sinds</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter" data-value="70000">0</span>
				<p>Liters bier gebrouwen in 2017</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter" data-value="365">0</span>
				<p>Dagen per jaar</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter" data-value="18">0</span>
				<p>Verschillende bieren</p>
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

.polaroid-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0; /* belangrijk zodat ze dicht op elkaar zitten */
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
		max-width: 100%;
		object-fit: contain;
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
