<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import IconArrow from '$lib/components/atoms/IconArrow.svelte';

	export let items: any[] = [];
	export let ariaLabel = 'Carousel';

	let carouselEl: HTMLElement | null = null;
	let slideEls: HTMLElement[] = [];

	let current = 0;
	let isAnimating = false;
	let isJsEnabled = false;
	let isProgrammaticScroll = false;

	let gsap: (typeof import('gsap'))['gsap'] | null = null;

	onMount(async () => {
		isJsEnabled = true;

		if (carouselEl) {
			slideEls = Array.from(carouselEl.querySelectorAll<HTMLElement>('.carousel-item'));
		}

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!prefersReducedMotion) {
			const mod = await import('gsap');
			gsap = mod.gsap;
		}
	});

	function scrollToIndex(index: number) {
		if (!carouselEl || !slideEls.length || isAnimating) return;
		if (!gsap) return; // safety check

		const oldSlide = slideEls[current];
		const newSlide = slideEls[index];
		if (!oldSlide || !newSlide) return;

		isAnimating = true;
		isProgrammaticScroll = true;

		const oldEls = oldSlide.querySelectorAll<HTMLElement>('.beer-image-wrapper, h3, .beer-stats');
		const newEls = newSlide.querySelectorAll<HTMLElement>('.beer-image-wrapper, h3, .beer-stats');

		// UIT animatie oude slide
		gsap.to(oldEls, {
			opacity: 0,
			y: 40,
			duration: 0.3,
			ease: 'power2.in',
			onComplete: () => {
				// scroll naar nieuwe slide
				const carouselRect = carouselEl!.getBoundingClientRect();
				const slideRect = newSlide.getBoundingClientRect();
				const offset =
					slideRect.left -
					carouselRect.left +
					carouselEl!.scrollLeft -
					(carouselRect.width - slideRect.width) / 2;

				carouselEl!.scrollTo({ left: offset, behavior: 'smooth' });

				// reset positie nieuwe slide
				gsap!.set(newEls, { opacity: 0, y: -30 });

				// IN animatie nieuwe slide
				gsap!.to(newEls, {
					opacity: 1,
					y: 0,
					duration: 0.45,
					stagger: 0.08,
					ease: 'power2.out',
					onComplete: () => {
						current = index;
						isAnimating = false;
						isProgrammaticScroll = false;
					}
				});
			}
		});
	}

	function next() {
		if (isAnimating) return;
		const nextIndex = (current + 1) % items.length;
		scrollToIndex(nextIndex);
	}

	function prev() {
		if (isAnimating) return;
		const prevIndex = (current - 1 + items.length) % items.length;
		scrollToIndex(prevIndex);
	}

	function handleScroll() {
		if (!carouselEl || isProgrammaticScroll) return;
		current = getClosestSlideIndex();
	}

	function getClosestSlideIndex() {
		if (!carouselEl) return 0;
		const scrollCenter = carouselEl.scrollLeft + carouselEl.clientWidth / 2;

		let closestIndex = 0;
		let smallestDistance = Infinity;

		slideEls.forEach((slide, index) => {
			const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
			const distance = Math.abs(scrollCenter - slideCenter);
			if (distance < smallestDistance) {
				smallestDistance = distance;
				closestIndex = index;
			}
		});

		return closestIndex;
	}

	function handleDotKeydown(e: KeyboardEvent, index: number) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			scrollToIndex(index);
		}
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			scrollToIndex((index + 1) % items.length);
		}
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			scrollToIndex((index - 1 + items.length) % items.length);
		}
	}
</script>

<section class="carousel-wrapper" aria-label={ariaLabel}>
	<div class="carousel" bind:this={carouselEl} on:scroll={handleScroll}>
		{#each items as item, i (item.slug)}
			<article class="carousel-item" id={`slide-${i}`}>
				<div class="beer-image-wrapper">
					<img src={item.image_url} alt={item.name} />
				</div>

				<div class="beer-info">
					<h3>{item.name}</h3>
					<p class="type">{item.beer_type}</p>

					<div class="beer-stats">
						<div class="stat">
							<span class="value">{item.alcohol_percentage}%</span>
							<span class="label">Alcohol</span>
						</div>
						<div class="stat-divider"></div>
						<div class="stat">
							<span class="value">{item.ebu}</span>
							<span class="label">EBU</span>
						</div>
						<div class="stat-divider"></div>
						<div class="stat">
							<span class="value">{item.ebc}</span>
							<span class="label">EBC</span>
						</div>
					</div>

					<Button href={`/bieren/${item.slug}`} label="Meer informatie" />
				</div>
			</article>
		{/each}
	</div>

	{#if isJsEnabled}
		<button class="nav prev" on:click={prev} aria-label="Vorige">
			<IconArrow direction="left" />
		</button>
		<button class="nav next" on:click={next} aria-label="Volgende">
			<IconArrow direction="right" />
		</button>
	{/if}

	{#if isJsEnabled}
		<nav class="carousel-dots" aria-label="Carousel navigatie">
			{#each items as item, i (item.slug)}
				<button
					class="dot"
					class:active={i === current}
					role="tab"
					aria-selected={i === current}
					aria-label={`Ga naar slide ${i + 1}`}
					tabindex={i === current ? 0 : -1}
					on:click|preventDefault={() => scrollToIndex(i)}
					on:keydown={(e) => handleDotKeydown(e, i)}
				></button>
			{/each}
		</nav>
	{:else}
		<nav class="carousel-dots no-js" aria-label="Carousel navigatie">
			{#each items as item, i (item.slug)}
				<a href={`#slide-${i}`} class="dot" aria-label={`Ga naar slide ${i + 1}`}></a>
			{/each}
		</nav>
	{/if}
</section>

<style>
	.carousel-wrapper {
		position: relative;
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
		container-type: inline-size;
		container-name: carousel;
	}

	.carousel {
		display: flex;
		gap: 2rem;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scroll-behavior: smooth;
		padding: 2rem 0;
		height: auto;
		overscroll-behavior-x: contain;
		background-color: var(--background-warm);
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	.carousel-item {
		flex: 0 0 100%;
		scroll-snap-align: center;
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 3rem;
		align-items: center;
		padding: 2rem;
		box-sizing: border-box;
	}

	.beer-image-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.beer-image-wrapper img {
		background-color: var(--background-color);
		width: 45%;
		max-height: 420px;
		object-fit: contain;
		border-radius: 1rem;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease;
	}

	.beer-info h3 {
		font-size: 2rem;
		margin-bottom: 0.25rem;
		color: var(--text-color);
	}

	.type {
		font-style: italic;
		opacity: 0.8;
		margin-bottom: 1rem;
	}

	.beer-stats {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 1.25rem;
		flex-wrap: wrap;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 60px;
	}

	.stat .value {
		font-size: 1.75rem;
		font-weight: 700;
	}

	.stat-divider {
		width: 2px;
		height: 40px;
		background-color: var(--divider-color);
	}

	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		z-index: 5;
	}

	/* Desktop / large */
	@container carousel (min-width: 60rem) {
		.nav.prev {
			left: 3rem;
		}
		.nav.next {
			right: 3rem;
		}
	}

	/* Tablet */
	@container carousel (min-width: 40rem) and (max-width: 60rem) {
		.nav {
			top: 55%;
		}
		.nav.prev {
			left: 1rem;
		}
		.nav.next {
			right: 1rem;
		}
	}

	/* Mobile */
	@container carousel (max-width: 40rem) {
		.carousel-item {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			padding: 1.5rem 1rem 2.5rem;
			text-align: center;
		}

		.beer-image-wrapper img {
			width: 70%;
			max-height: 260px;
		}

		.beer-info h3 {
			font-size: 1.5rem;
		}

		.stat .value {
			font-size: 1.4rem;
		}

		.stat-divider {
			width: 1px;
			height: 30px;
		}

		.beer-stats {
			justify-content: center;
			gap: 1rem;
		}

		.nav {
			top: auto;
			bottom: 0.5rem;
			transform: none;
		}

		.nav.prev {
			left: 0.5rem;
		}
		.nav.next {
			right: 0.5rem;
		}
	}

	.carousel-dots {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--accent);
		border: none;
		cursor: pointer;
	}

	.dot.active {
		background: var(--accent-color);
	}

	.dot:focus-visible {
		outline: 2px solid var(--accent-color);
		outline-offset: 3px;
	}
</style>
