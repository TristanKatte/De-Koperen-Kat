<script lang="ts">
	export const ssr = false;

	import { onMount } from 'svelte';

	let heroSection: HTMLElement | null = null;

	onMount(async () => {
		if (typeof window === 'undefined') return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;
		if (!heroSection) return;

		// ✅ Alles dynamisch laden
		const gsapModule = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		const { SplitText } = await import('gsap/SplitText');

		const gsap = gsapModule.gsap;

		gsap.registerPlugin(ScrollTrigger, SplitText);

		const logoEl = heroSection.querySelector('.logo');
		const titleEl = heroSection.querySelector('.hero-title');
		const subtitleEl = heroSection.querySelector('.hero-subtitle');
		const buttons = gsap.utils.toArray<HTMLElement>('.hero-actions .btn');

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

		if (logoEl) {
			tl.from(logoEl, {
				opacity: 0,
				x: -100,
				duration: 0.6,
				ease: 'power2.out'
			});
		}

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
			);
		}

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
			);
		}

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
			);
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
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 100vh;
		color: #fff;
		overflow: hidden;
		text-align: center;
		margin: auto;
		background-size: cover;
		background-position: center;
		animation: animate 25s infinite ease-in-out;
		object-fit: cover;
		overflow: hidden;
		z-index: 0;
	}

	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.45);
		z-index: 1;
	}

	@keyframes animate {
		0% {
			background-image: url(/images/brewery-hero.png);
		}

		25% {
			background-image: url(/images/bar-gloed.png);
		}

		50% {
			background-image: url(/images/bar-gloed-1.png);
		}

		75% {
			background-image: url(/images/vergisting-ketels.png);
		}

		100% {
			background-image: url(/images/bar-glas-ketels.png);
		}
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
		text-align: center; /* tekst links uitlijnen */
		max-width: 600px;
		margin: 0 auto;
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
		justify-content: center;
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
	@media (min-width: 70rem) {
		.hero-text {
			max-width: 45ch;
		}
	}

	@media (min-width: 50rem) {
		.hero-content {
			display: grid;
			grid-template-columns: auto 1fr;
			align-items: center;
			gap: 4rem;

			text-align: left;
			justify-items: start;
		}

		.hero-top {
			display: contents; /* laat grid leidend zijn */
		}

		.logo {
			max-width: 300px;
			transform: none;
		}

		.hero-text {
			max-width: 70ch;
			text-align: left;
		}

		.hero-actions {
			justify-content: flex-start;
		}
	}

	/* ===== SplitText chars ===== */
	:global(.char) {
		display: inline-block;
		white-space: pre;
	}
</style>
