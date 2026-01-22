<script lang="ts">
	export const ssr = false;
	import { onMount } from 'svelte';
	import Button from '../atoms/Button.svelte';

onMount(async () => {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return;

	const { gsap } = await import('gsap');
	const { ScrollTrigger } = await import('gsap/ScrollTrigger');
	const { SplitText } = await import('gsap/SplitText');

	gsap.registerPlugin(ScrollTrigger, SplitText);

	// TEKST – per woord, blijft staan na scroll
	const elements = document.querySelectorAll(
		'.about-section h2, .about-section h3, .about-section p'
	);

	elements.forEach((el) => {
		const split = new SplitText(el, { type: 'words' });

		gsap.from(split.words, {
			scrollTrigger: {
				trigger: el,
				start: 'top 85%',
				toggleActions: 'play none none none' // nooit terug animeren
			},
			opacity: 0,
			y: 20,
			stagger: 0.04,
			duration: 0.4,
			ease: 'power2.out'
		});
	});

	// AFBEELDINGEN – fade + lift on scroll
	const images = gsap.utils.toArray('.zigzag img') as HTMLElement[];

	images.forEach((img) => {
		gsap.from(img, {
			scrollTrigger: {
				trigger: img,
				start: 'top 85%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			y: 40,
			scale: 0.96,
			duration: 0.8,
			ease: 'power3.out'
		});
	});
});
</script>

<section class="about-section" aria-labelledby="about-title">
	<div class="content">
		<h2 id="about-title">Over Stadsbrouwerij De Koperen Kat</h2>

		<div class="zigzag">

			<!-- 1. Tekst - Afbeelding -->
			<div class="zigzag-row">
				<div class="text">
					<h3>Wie zijn we?</h3>
					<p>
						Wij zijn <strong>De Koperen Kat</strong> — een eigentijdse, eigenwijze stadsbrouwerij sinds 2011
						in het mooie Delft. We zijn een authentieke craft brewery met de focus op kwaliteitsbieren.
					</p>
				</div>
				<img src="/images/bar-gloed-1.jpg" alt="glas op de bar" />
			</div>

			<!-- 2. Afbeelding - Tekst -->
			<div class="zigzag-row reverse">
				<img src="/images/brouwerij-feest.jpg" alt="Brouwerij feest" />
				<div class="text">
					<h3>Wat doen we?</h3>
					<p>
						We maken op eigen wijze, volgens onze eigen recepturen kwaliteitsbieren. We hebben maar liefst
						18 soorten, waarvan onze herfstbock zelfs is uitgeroepen tot de lekkerste van Nederland!
					</p>
				</div>
			</div>

			<!-- 3. Tekst - Afbeelding -->
			<div class="zigzag-row">
				<div class="text">
					<h3>Waarom doen we het?</h3>
					<p>
						We willen de oude historie van Delft als grootste bierbrouwstad van Europa nieuw leven
						inblazen. In de 16e eeuw waren er meer dan 250 brouwerijen.
					</p>
				</div>
				<img src="/images/vergisting-ketels.jpg" alt="Vergisting ketels" />
			</div>

			<!-- 4. Afbeelding - Tekst -->
			<div class="zigzag-row reverse">
				<img src="/images/ketels.jpg" alt="Brouwerij interieur" />
				<div class="text">
					<h3>Waar doen we het?</h3>
					<p>
						We zitten in de oude Kabelfabriek aan de Schieweg, waar de brouwerij en het proeflokaal samenkomen.
					</p>
				</div>
			</div>

		</div>

		<div class="button-wrapper">
			<Button href="/de-brouwerij" label="Lees meer over ons" />
		</div>
	</div>
</section>

<style>
.about-section {
	padding: 6rem 2rem;
	background-color: var(--background-color);
	position: relative;
	container-type: inline-size;
	container-name: about;
}

.about-section::before {
	content: '';
	position: absolute;
	left: 0; /* of right:0 als je afwisseling wil */
	top: 0;
	width: 6px;
	height: 100%;
	background: var(--accent);
	pointer-events: none;
	opacity: 0.9;
}

.content {
	max-width: 1200px;
	margin: 0 auto;
	background: #fff;
	border-radius: 1.5rem;
	padding: 4rem 5rem;
	box-shadow: 0 20px 40px rgba(0,0,0,.06);
}

h2 {
	text-align: center;
	margin-bottom: 4rem;
	color: var(--text-color);
	font-size: 2.5rem;
}

.zigzag {
	display: flex;
	flex-direction: column;
	gap: 5rem;
	margin-top: 3rem;
}

.zigzag-row {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3rem;
	align-items: center;
}

.zigzag-row.reverse {
	grid-template-columns: 1fr 1fr;
}

.zigzag-row.reverse > .text {
	order: 2;
}

.zigzag-row.reverse > img {
	order: 1;
}

.zigzag img {
	width: 100%;
	height: 320px;
	object-fit: cover;
	border-radius: 1rem;
	box-shadow: 0 10px 25px rgba(0,0,0,.08);
}

.text h3 {
	margin-bottom: .5rem;
	color: var(--text-color);
	font-size: 1.75rem;
	position: relative;
}

.text h3::after {
	content: '';
	display: block;
	margin-top: 0.25rem;
	width: 20ch;
	height: 3px;
	background: var(--accent);
	border-radius: 2px;
}

.text p {
	line-height: 1.7;
	max-width: 60ch;
	color: var(--text-color);
	margin-top: 1rem;
	font-size: 1.125rem;
}

strong {
	color: var(--accent);
	font-weight: 600;
}

.button-wrapper {
	text-align: center;
	margin-top: 4rem;
}

/* Mobiel */
@container about (max-width: 50rem) {
	.content {
		padding: 2rem 1.5rem;
	}

	.zigzag-row {
		grid-template-columns: 1fr;
	}

	.zigzag-row.reverse {
		direction: ltr;
	}

	.zigzag img {
		height: 220px;
	}
}
</style>
