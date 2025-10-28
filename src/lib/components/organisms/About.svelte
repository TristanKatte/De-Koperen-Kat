<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';
	import Button from '../atoms/Button.svelte';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

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
				scale: 0.8,
				stagger: 0.015,
				duration: 0.6,
				ease: 'back.out(1.4)'
			});
		});
	});
</script>

<section class="about-section" aria-labelledby="about-title">
	<div class="content">
		<h2 id="about-title">Over Stadsbrouwerij De Koperen Kat</h2>

		<h3>Wie zijn we?</h3>
		<p>
			Wij zijn <strong>De Koperen Kat</strong> — een eigentijdse, eigenwijze stadsbrouwerij sinds
			2011 in het mooie Delft. We zijn een authentieke craft brewery met de focus op kwaliteitsbieren.
		</p>

		<h3>Wat doen we?</h3>
		<p>
			We maken op eigen wijze, volgens onze eigen recepturen kwaliteitsbieren. We hebben maar liefst
			18 soorten, waarvan onze herfstbock zelfs is uitgeroepen tot de lekkerste van Nederland!
		</p>

		<h3>Waarom doen we het?</h3>
		<p>
			We willen de oude historie van Delft als grootste bierbrouwstad van Europa nieuw leven inblazen.
			In de 16e eeuw waren er meer dan 250 brouwerijen, maar na de sluiting van de laatste in 1922
			geen enkele meer — tot wij kwamen.
		</p>

		<h3>Waar doen we het?</h3>
		<p>
			We zitten in een groot pand aan de Schieweg — de vroegere Kabelfabriek. Dit karakteristieke
			pand is aan de voorkant omgebouwd tot brouwerij met proeflokaal.
		</p>

		<div class="button-wrapper">
			<Button href="/about" label="Lees meer over ons" />
		</div>
	</div>
</section>

<style>
	.about-section {
		min-height: 100vh;
		padding: 5rem 1.5rem;
		background-color: var(--accent-light);
		color: var(--text-color);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
		line-height: 1.7;
	}

	h2 {
		font-size: 2.25rem;
		font-weight: 700;
		margin-bottom: 2rem;
		text-align: left;
	}

	h3 {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.125rem;
		margin-bottom: 1.5rem;
		color: var(--text-color);
	}

	strong {
		color: var(--cta-buttons);
	}

	.button-wrapper {
		margin-top: 2rem;
		text-align: left;
	}

	@media (max-width: 768px) {
		.about-section {
			padding: 3rem 1.5rem;
		}

		h2 {
			font-size: 1.75rem;
		}

		h3 {
			font-size: 1.25rem;
		}

		p {
			font-size: 1rem;
		}
	}
</style>
