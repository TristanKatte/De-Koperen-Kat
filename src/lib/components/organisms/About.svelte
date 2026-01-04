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

		<div class="polaroid-grid">
			<div class="polaroid rotate-left">
				<img src="/images/ketels.jpg" alt="Brouwerij interieur met koperen ketels" />
			</div>
			<div class="polaroid rotate-right">
				<img src="/images/bar-gloed-1.jpg" alt="Proeflokaal sfeerimpressie" />
			</div>
			<div class="polaroid rotate-small">
				<img src="/images/brouwerij-feest.jpg" alt="Feest bij de brouwerij" />
			</div>
		</div>

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
			<Button href="/de-brouwerij" label="Lees meer over ons" />
		</div>
	</div>
</section>

<style>
	.about-section {
		padding: 5rem 1.5rem;
		background-color: var(--background-color);
		color: var(--text-color);
		display: flex;
		justify-content: center;
	}

	.content {
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
	}

	.content p {
		max-width: 75ch;
	}	

	/* POLAROID GRID */
	.polaroid-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.polaroid {
		padding: 0.75rem;
		padding-bottom: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 6px rgba(0, 0, 0, 0.05);
		transition: transform 0.25s ease;
	}

	.polaroid img {
		width: 100%;
		height: 240px;
		object-fit: cover;
		border-radius: 0.35rem;
	}

	.rotate-left {
		transform: rotate(-4deg);
	}
	.rotate-right {
		transform: rotate(5deg);
	}
	.rotate-small {
		transform: rotate(-1deg);
	}

	.polaroid:hover {
		transform: scale(1.03) rotate(0deg);
	}

	/* TEXT */
	h2 {
		font-size: 2.25rem;
		margin-bottom: 2rem;
	}

	h3 {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.125rem;
		margin-bottom: 1.5rem;
	}

	strong {
		color: var(--cta-buttons);
	}

	/* RESPONSIVE */
	@media (max-width: 900px) {
		.polaroid-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.polaroid-grid {
			grid-template-columns: 1fr;
		}

		.polaroid img {
			height: 200px;
		}
	}
</style>
