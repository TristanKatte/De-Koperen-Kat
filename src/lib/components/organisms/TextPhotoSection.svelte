<script lang="ts">
	import { onMount } from 'svelte';

	let { title, content, photos, index = 0 } = $props();
	let sectionEl: HTMLElement;

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		const { SplitText } = await import('gsap/SplitText');
		gsap.registerPlugin(ScrollTrigger, SplitText);

		const h2 = sectionEl.querySelector('h2');
		const p = sectionEl.querySelector('p');

if (h2) {
	const split = new SplitText(h2, { type: 'words' });
	gsap.from(split.words, {
		opacity: 0,
		y: 40,
		stagger: 0.08,
		duration: 0.5,
		ease: 'power3.out',
		scrollTrigger: { trigger: h2, start: 'top 85%', once: true }
	});
}

if (p) {
	const split = new SplitText(p, { type: 'words' });
	gsap.from(split.words, {
		opacity: 0,
		y: 25,
		stagger: 0.04,
		duration: 0.4,
		ease: 'power2.out',
		scrollTrigger: { trigger: p, start: 'top 85%', once: true }
	});
}


		sectionEl.querySelectorAll('img').forEach((img, i) => {
			gsap.from(img, {
				opacity: 0,
				y: 50 + i * 5,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: { trigger: img, start: 'top 90%', once: true }
			});
		});
	});
</script>

<section bind:this={sectionEl} class="text-photo-section {index % 2 === 0 ? 'left' : 'right'}">
	<div class="text">
		<h2>{title}</h2>
		<p>{content}</p>
	</div>

	<div class="photo-grid">
		{#each photos as photo, i}
			<img src={photo} 
				 alt={`Foto ${i + 1} van ${title}`} 
				 class="grid-img" 
				 width="600"
				 height="400"
				 loading="lazy" />
		{/each}
	</div>
</section>

<style>
	.text-photo-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin: 0 auto 6rem;
		width: 100%;
		max-width: 1200px;
		padding: 0 1.5rem;
		container-type: inline-size;
		container-name: text-photo-section;
	}

	.text h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
		position: relative;
		color: var(--text-color);
	}

	.text h2::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -0.5rem;
		width: 6ch;
		height: 3px;
		background: var(--accent);
		border-radius: 2px;
	}

	.text p {
		font-size: 1.1rem;
		line-height: 1.6;
	}

	/* Mobiel: alles onder elkaar */
	.photo-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.grid-img {
		width: 100%;
		height: 220px;
		object-fit: cover;
		border-radius: 0.75rem;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
	}

	/* Desktop: zigzag layout */
	@media (min-width: 768px) {
		.text-photo-section.left {
			flex-direction: row;
			align-items: flex-start;
		}

		.text-photo-section.right {
			flex-direction: row-reverse;
			align-items: flex-start;
		}

		.text {
			flex: 1;
			padding: 0 1rem;
		}

		.photo-grid {
			flex: 1;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		/* Zigzag offsets */
		.photo-grid img:nth-child(1) {
			transform: translateY(-5rem);
		}
		.photo-grid img:nth-child(2) {
			transform: translateY(2rem);
		}
		.photo-grid img:nth-child(3) {
			transform: translateY(1rem);
		}
		.photo-grid img:nth-child(4) {
			transform: translateY(3rem);
		}
		.photo-grid img:nth-child(5) {
			transform: translateY(1.5rem);
		}
	}
</style>
