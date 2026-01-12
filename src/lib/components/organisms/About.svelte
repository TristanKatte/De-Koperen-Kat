<script lang="ts">
	export const ssr = false;
	import { onMount } from 'svelte';
	import Button from '../atoms/Button.svelte';

	onMount(async () => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		// ⬇️ Dynamisch importeren — voorkomt Netlify SSR errors
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		const { SplitText } = await import('gsap/SplitText');

		gsap.registerPlugin(ScrollTrigger, SplitText);

		// TEXT ANIMATIONS
		const elements = document.querySelectorAll(
			'.about-section h2, .about-section h3, .about-section p'
		);

		elements.forEach((el) => {
			const split = new SplitText(el, { type: 'chars, words' });

			gsap.from(split.chars, {
				scrollTrigger: {
					trigger: el,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				},
				opacity: 0,
				y: 30,
				scale: 0.9,
				stagger: 0.015,
				duration: 0.25,
				ease: 'back.out(1.4)'
			});
		});

		// IMAGE ANIMATIONS — polaroids
		const images = gsap.utils.toArray('.polaroid') as HTMLElement[];

		images.forEach((img) => {
			gsap.from(img, {
				scrollTrigger: {
					trigger: img,
					start: 'top 90%'
				},
				opacity: 0,
				y: 50,
				rotate: gsap.utils.random(-8, 8),
				duration: 0.9,
				ease: 'power3.out'
			});
		});
	});
</script>

<section class="about-section" aria-labelledby="about-title">
	<div class="content">
		<h2 id="about-title">Over Stadsbrouwerij De Koperen Kat</h2>

		<div class="about-editorial">
			<img src="/images/ketels.jpg" alt="Koperen brouwketels" />
			<img src="/images/brouwerij-feest.jpg" alt="Brouwerij feest" />
			<img src="/images/vergisting-ketels.jpg" alt="Vergisting ketels" />
		</div>

		<h3>Wie zijn we?</h3>
		<p>
			Wij zijn <strong>De Koperen Kat</strong> — een eigentijdse, eigenwijze stadsbrouwerij sinds 2011
			in het mooie Delft. We zijn een authentieke craft brewery met de focus op kwaliteitsbieren.
		</p>

		<h3>Wat doen we?</h3>
		<p>
			We maken op eigen wijze, volgens onze eigen recepturen kwaliteitsbieren. We hebben maar liefst
			18 soorten, waarvan onze herfstbock zelfs is uitgeroepen tot de lekkerste van Nederland!
		</p>

		<h3>Waarom doen we het?</h3>
		<p>
			We willen de oude historie van Delft als grootste bierbrouwstad van Europa nieuw leven
			inblazen. In de 16e eeuw waren er meer dan 250 brouwerijen, maar na de sluiting van de laatste
			in 1922 geen enkele meer — tot wij kwamen.
		</p>

		<h3>Waar doen we het?</h3>
		<p>
			We zitten in een groot pand aan de Schieweg — de vroegere Kabelfabriek. Dit karakteristieke
			pand is aan de voorkant omgebouwd tot brouwerij met proeflokaal.
		</p>

		<div class="button-wrapper">
			<Button href="/de-brouwerij" label="Lees meer over ons" />
		</div>
	</div>
</section>

<style>
	.about-section {
		padding: 6rem 2rem;
		background-color: var(--background-color);
		color: var(--text-color);
		display: flex;
		justify-content: center;
		container-type: inline-size;
		container-name: about;
	}

	.about-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 6px;
		height: 100%;
		background: var(--accent);
		pointer-events: none;
		opacity: 0.9;
	}

	.content {
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 1.5rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
	}

	.content p {
		max-width: 75ch;
	}

	.about-editorial {
		display: grid;
		gap: 1.5rem;
	}

	.about-editorial img {
		width: 100%;
		height: 260px;
		object-fit: cover;
		border-radius: 1.25rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
	}

	/* TEXT */
	h2 {
		font-size: clamp(2rem, 4cqi, 2.75rem);
		margin-bottom: 2rem;
		color: var(--text-color);
	}

	h3 {
		font-size: 1.35rem;
		margin-top: 2.5rem;
		margin-bottom: 0.75rem;
		color: #333;
	}

	p {
		font-size: 1.05rem;
		line-height: 1.7;
		color: #444;
		max-width: 70ch;
		margin-bottom: 1.5rem;
	}

	strong {
		color: var(--cta-buttons);
		font-weight: 600;
	}

	/* RESPONSIVE */
	@container about (max-width: 50rem) {
		.content {
			padding: 2.5rem 1.5rem;
			border-radius: 1rem;
		}

		h2 {
			font-size: 1.75rem;
		}

		h3 {
			font-size: 1.25rem;
		}
	}

	@container about (min-width: 70rem) {
		.about-editorial {
			grid-template-columns: 2fr 1fr;
		}

		.about-editorial img:first-child {
			grid-row: span 2;
			height: 100%;
		}

		.content {
			padding: 5rem 6rem;
		}
	}
</style>
