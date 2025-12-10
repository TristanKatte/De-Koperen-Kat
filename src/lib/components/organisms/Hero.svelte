<script lang="ts">
	export const ssr = false;
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	let heroSection: HTMLElement | null = $state(null);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		if (!heroSection) return;

		// Selecteer elementen
		const logoEl = heroSection.querySelector('.logo');
		const titleEl = heroSection.querySelector('.hero-title');
		const subtitleEl = heroSection.querySelector('.hero-subtitle');
		const buttons = gsap.utils.toArray('.hero-actions .btn');

		// SplitText voor animatie
		const splitTitle = titleEl
			? new SplitText(titleEl, { type: 'chars', charsClass: 'char' })
			: null;
		const splitSubtitle = subtitleEl
			? new SplitText(subtitleEl, { type: 'words', wordsClass: 'word' })
			: null;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: heroSection,
				start: 'top 85%'
			}
		});

		// Logo animatie
		if (logoEl) {
			tl.from(logoEl, {
				opacity: 0,
				x: -100,
				duration: 0.6,
				ease: 'power2.out'
			});
		}

		// Titel animatie
		if (splitTitle) {
			tl.from(
				splitTitle.chars,
				{
					opacity: 0,
					y: 50,
					scale: 0,
					stagger: 0.03,
					duration: 0.45,
					ease: 'elastic.out(1, 0.6)'
				},
				'-=0.3'
			); // overlap met logo
		}

		// Subtitle animatie
		if (splitSubtitle) {
			tl.from(
				splitSubtitle.words,
				{
					opacity: 0,
					y: 25,
					stagger: 0.05,
					duration: 0.45,
					ease: 'power2.out'
				},
				'-=0.6'
			); // overlap met titel
		}

		// Buttons animatie
		if (buttons.length) {
			tl.from(
				buttons,
				{
					opacity: 0,
					y: 15,
					stagger: 0.12,
					duration: 0.45,
					ease: 'power2.out'
				},
				'-=0.5'
			); // overlap met subtitle
		}
	});
</script>

<section bind:this={heroSection} class="hero">
	<div class="hero-content">
		<div class="hero-top">
			<img src="/images/dkk-logo.png" alt="Logo" class="logo" />

			<div class="hero-text">
				<h1 class="hero-title">
					Welkom bij <span class="no-break">Stadsbrouwerij<br />De Koperen Kat</span>
				</h1>
				<p class="hero-subtitle">De oudste stadsbrouwerij van Delft</p>
				<div class="hero-actions">
					<a href="/beers" class="btn btn--primary">Bekijk onze bieren</a>
					<a href="/tasting-room" class="btn btn--secondary">Boek een proeflokaal</a>
				</div>
			</div>
		</div>
	</div>

	<div class="hero-image">
		<img src="/images/brewery-hero.jpg" alt="Brouwerij" />
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 100vh;
		color: #fff;
		overflow: hidden;
		text-align: center;
		margin: auto;
	}

	.hero-top {
		display: flex;
		flex-wrap: wrap; 
		align-items: center; 
		justify-content: center; 
		gap: 3rem;
	}
	
  .logo {
		max-width: 250px;
		height: auto;
    transform: translate(5px, -40px);
	}

	.hero-text {
		flex: 1;
		text-align: left; /* tekst links uitlijnen */
    max-width: 600px;
    margin: 0 auto;
	}

	/* ===== Achtergrondafbeelding ===== */
	.hero-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		overflow: hidden;
		z-index: 0;
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
	}

	/* Overlaykleur */
	.hero-image::after {
		content: '';
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.45);
		z-index: 1;
	}

	/* ===== Tekst & content ===== */
	.hero-content {
		position: relative;
		z-index: 2;
		max-width: 90rem;
		padding: 4rem 2rem;
		display: grid;
		gap: 2rem;
		justify-items: center;
		text-align: center;
		margin: 0 auto;
	}

	.hero-title {
		font-family: 'Noticia Text', serif;
		font-size: clamp(1.5rem, 4vw + 1rem, 4.5rem); /* iets kleiner minimum */
		line-height: 1.1;
		font-weight: 700;
		color: #fff;
		margin: 0;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
		word-break: keep-all; /* voorkomt onnodige breuken */
		overflow-wrap: normal;
	}

	.hero-subtitle {
		font-family: 'Ubuntu', sans-serif;
		font-size: clamp(1.25rem, 2.5vw, 2rem);
		line-height: 1.5;
		margin: 0;
		color: #f2f2f2;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	}

	/* ===== Knoppen ===== */
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}

	.btn {
		display: inline-block;
		padding: 0.9rem 2rem;
		border-radius: 0.5rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background-color 0.25s ease,
			transform 0.25s ease;
	}

	.btn--primary {
		background-color: #ed651c;
		color: #fff;
	}

	.btn--primary:hover {
		background-color: var(--cta-hover);
		transform: scale(1.05);
	}

	.btn--secondary {
		border: 2px solid #ed651c;
		color: #f5f5f0;
		background: transparent;
	}

	.btn--secondary:hover {
		background-color: var(--cta-hover);
		color: #fff;
	}

	/* ===== Responsiviteit ===== */
	@media (min-width: 50rem) {
		.hero-content {
			padding: 6rem 5rem;
		}

		.hero-title {
			font-size: clamp(2.5rem, 3vw + 1rem, 5rem);
		}
	}

	/* ===== SplitText chars ===== */
	:global(.char) {
		display: inline-block;
		white-space: pre;
	}
</style>
