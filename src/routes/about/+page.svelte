<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';
	import { aboutContent } from '$lib/content/about';
	import Button from '$lib/components/atoms/Button.svelte';
	import Polaroid from '$lib/components/molecules/Polaroid.svelte';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	const sections = [
		{
			title: 'Ontstaan 🍺',
			content: aboutContent.origin,
			photos: ['/images/glas-bar.jpg', '/images/bar-gloed-1.jpg']
		},
		{
			title: 'Locatie 📍',
			content: aboutContent.location,
			photos: ['/images/bar-gloed-1.jpg', '/images/vergisting-ketels.jpg']
		},
		{
			title: 'Onze passie ❤️',
			content: aboutContent.passion,
			photos: ['/images/glas-bar.jpg', '/images/vergisting-ketels.jpg']
		}
	];

	const partners = aboutContent.partners;
	const huurbrouwen = aboutContent.huurbrouwen;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		// Animatie voor koppen en paragrafen per sectie
		const sectionEls = document.querySelectorAll('.text-photo-container');
		sectionEls.forEach((section) => {
			const h2 = section.querySelector('h2');
			const p = section.querySelector('p');

			// H2 animatie
			const splitH2 = new SplitText(h2, { type: 'chars, words' });
			gsap.from(splitH2.chars, {
				opacity: 0,
				y: 50,
				duration: 0.8,
				stagger: 0.03,
				ease: 'power2.out',
				scrollTrigger: { trigger: h2, start: 'top 85%' }
			});

			// P animatie
			const splitP = new SplitText(p, { type: 'chars, words' });
			gsap.from(splitP.chars, {
				opacity: 0,
				y: 25,
				duration: 0.8,
				stagger: 0.02,
				ease: 'power2.out',
				scrollTrigger: { trigger: p, start: 'top 85%' }
			});
		});

		// Polaroid animaties
		const polaroids = document.querySelectorAll('.photo-grid .polaroid');
		polaroids.forEach((card, i) => {
			const rotation = gsap.utils.random(-6, 6);
			gsap.from(card, {
				opacity: 0,
				y: 50,
				rotate: rotation,
				duration: 1,
				delay: i * 0.1,
				ease: 'back.out(1.7)',
				scrollTrigger: { trigger: card, start: 'top 90%', once: true }
			});

			card.addEventListener('mouseenter', () => {
				gsap.to(card, { y: -10, rotate: rotation / 2, duration: 0.3, ease: 'power2.out' });
			});
			card.addEventListener('mouseleave', () => {
				gsap.to(card, { y: 0, rotate: rotation, duration: 0.3, ease: 'power2.in' });
			});
		});
	});
</script>

<main class="about-section">
	<header class="about-header">
		<h1>Over De Koperen Kat</h1>
		<p class="intro">{aboutContent.intro}</p>
	</header>

	{#each sections as section, i}
		<section class="text-photo-container {i % 2 === 0 ? 'left' : 'right'}">
			<div class="text">
				<h2>{section.title}</h2>
				<p>{section.content}</p>
			</div>
			<div class="photo-grid">
				{#each section.photos as photo, j}
					<Polaroid
						src={photo}
						alt={`Foto ${j + 1} van ${section.title}`}
						rotation={j % 2 === 0 ? -5 : 5}
					/>
				{/each}
			</div>
		</section>
	{/each}

	<!-- Counters -->
	<section class="counters">
		<div class="counters-grid">
			<div class="counter-wrapper">
				<span class="counter">250+</span>
				<p>Vroegere brouwerijen</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter">2011</span>
				<p>Oudste brouwerij sinds</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter">70.000</span>
				<p>Liters bier gebrouwen in 2017</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter">365</span>
				<p>Dagen per jaar</p>
			</div>
			<div class="counter-wrapper">
				<span class="counter">18</span>
				<p>Verschillende bieren</p>
			</div>
		</div>
	</section>

	<!-- Partners -->
	<section class="partners">
		<h2>Onze partners 🤝</h2>
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
	<section class="huurbrouwen">
		<h2>Huurbrouwen 🍻</h2>
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
		margin: 0 auto 3rem;
		text-align: center;
		color: #444;
	}

	/* Tekst + foto secties */
	.text-photo-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		max-width: 800px;
		margin-bottom: 5rem;
	}

	.text-photo-container .text,
	.text-photo-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		max-width: 900px;
		margin-bottom: 3rem;
	}

	.text-photo-container h2 {
		text-align: left;
		width: 100%;
	}

	.text-photo-container .text {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.photo-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	@media (min-width: 768px) {
		.text-photo-container.left {
			flex-direction: row;
			align-items: flex-start;
		}
		.text-photo-container.right {
			flex-direction: row-reverse;
			align-items: flex-start;
		}
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
		max-width: 70ch;
		margin-bottom: 1rem;
	}

	/* Counters */
.counters-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    justify-items: center;
    margin-bottom: 3rem;
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
	}

	/* Partners & Huurbrouwen */
	.partners-grid,
	.huurbrouwen-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1.5rem;
		justify-items: center;
		margin-bottom: 3rem;
		max-width: 900px;
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
