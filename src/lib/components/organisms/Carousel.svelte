<script lang="ts">
	export const ssr = false;

	import Button from '$lib/components/atoms/Button.svelte';
	import IconArrow from '$lib/components/atoms/IconArrow.svelte';

	export let items: any[] = [];
	export let ariaLabel = 'Carousel';

	let current = 0;
	let isAnimating = false;

	let imageEl: HTMLElement;
	let titleEl: HTMLElement;
	let statsEl: HTMLElement;

	// GSAP lazy instance
	let gsapInstance: typeof import('gsap')['gsap'] | null = null;

	async function loadGSAP() {
		if (!gsapInstance) {
			const mod = await import('gsap');
			gsapInstance = mod.gsap;
		}
		return gsapInstance;
	}

	function next() {
		if (isAnimating) return;
		animateTo((current + 1) % items.length);
	}

	function prev() {
		if (isAnimating) return;
		animateTo((current - 1 + items.length) % items.length);
	}

	async function animateTo(index: number) {
		const gsap = await loadGSAP();
		if (!gsap || !imageEl || !titleEl || !statsEl) return;

		isAnimating = true;

		const primary = [imageEl, titleEl, statsEl];

		// UIT
		gsap.to(primary, {
			opacity: 0,
			y: 40,
			duration: 0.3,
			ease: 'power2.in',
			onComplete: () => {
				current = index;

				// reset positie
				gsap.set(primary, { y: -30 });

				// IN
				gsap.to(primary, {
					opacity: 1,
					y: 0,
					duration: 0.45,
					ease: 'power2.out',
					stagger: 0.08,
					onComplete: () => {
						isAnimating = false;
					}
				});
			}
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	}
</script>



<section class="carousel" aria-label={ariaLabel}>
	<button class="nav prev" on:click={prev} aria-label="Vorige" on:keydown={handleKeydown}>
		<IconArrow direction="left" />
	</button>

	<div class="carousel-content">
		{#if items.length}
			<div class="beer-layout">
				<div class="beer-image-wrapper" bind:this={imageEl}>
					<img src={items[current].image_url} alt={items[current].name} />
				</div>

				<div class="divider"></div>

				<div class="beer-info">
					<h3 bind:this={titleEl}>{items[current].name}</h3>
					<p class="type">{items[current].beer_type}</p>

					<div class="beer-stats" bind:this={statsEl}>
						<div class="stat">
							<span class="value">{items[current].alcohol_percentage}%</span>
							<span class="label">Alcohol</span>
						</div>

						<div class="stat-divider"></div>

						<div class="stat">
							<span class="value">{items[current].ebu}</span>
							<span class="label">EBU</span>
						</div>

						<div class="stat-divider"></div>

						<div class="stat">
							<span class="value">{items[current].ebc}</span>
							<span class="label">EBC</span>
						</div>
					</div>

					<p class="description">{items[current].taste}</p>

					<Button href={`/beers/${items[current].slug}`} label="Meer informatie" />
				</div>
			</div>
		{/if}
	</div>

	<button class="nav next" on:click={next} aria-label="Volgende" on:keydown={handleKeydown}>
		<IconArrow direction="right" />
	</button>
</section>

<style>
	.carousel {
		position: relative;
		width: 60%;
		min-height: 70vh;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		background-color: var(--background-alt);
	}

	.carousel-content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.beer-layout {
		display: grid;
		grid-template-columns: 1.4fr auto 1fr;
		gap: 3rem;
		align-items: center;
		justify-items: center;
		width: 100%;
	}

	.beer-image-wrapper {
		width: 100%;
		max-height: 660px; /* 👈 groter */
		object-fit: contain;
		border-radius: 1rem;
		margin-bottom: 2rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease;
		overflow: hidden;
	}

	.beer-image-wrapper img {
		width: 100%;
		max-height: 660px;
		object-fit: contain;

		border-radius: 0;
	}

	.divider {
		width: 2px;
		height: 70%;
		background-color: var(--background-color);
	}

	.beer-info h3 {
		font-size: 2.2rem;
		margin-bottom: 0.25rem;
		color: var(--text-color-alt);
	}

	.type {
		font-style: italic;
		opacity: 0.8;
		margin-bottom: 1.5rem;
	}

	.beer-info p {
		color: var(--text-color-alt);
		line-height: 1.6;
		max-width: 80ch;
	}

	.beer-stats {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 80px;
	}

	.stat .value {
		font-size: 2.25rem;
		font-weight: 700;
		line-height: 1;
	}

	.stat .label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
		margin-top: 0.25rem;
	}

	.stat-divider {
		width: 1px;
		height: 48px;
		background: rgba(255, 255, 255, 0.25);
	}

	.description {
		max-width: 480px;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	/* NAV */
	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		z-index: 5;
	}

	.nav.prev {
		left: -6rem;
	}

	.nav.next {
		right: -6rem;
	}

	/* MEDIA QUERIES */
	@media screen and (max-width: 768px) {
		.carousel {
			width: 100%;
			min-height: auto;
			padding: 3rem 1rem;
			margin: 0;
		}

		.beer-layout {
			grid-template-columns: 1fr;
			gap: 1rem;
			text-align: left;
			justify-items: center;
		}

		.beer-image-wrapper {
			padding: 1.5rem;
			border-radius: 1rem;
			margin-left: auto;
			margin-right: auto;
		}

		.beer-image-wrapper img {
			max-height: 500px;
			width: 100%;
			max-height: 660px;
			object-fit: contain;
			border-radius: 0;
		}

		.divider {
			display: none;
		}

		.beer-info {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.beer-stats {
			justify-content: center;
		}

		.beer-info p {
			max-width: 50ch;
		}

		.nav {
			top: auto;
			bottom: -3.5rem;
			transform: none;
			margin: 0 auto;
		}

		.nav.prev {
			left: 2rem;
		}

		.nav.next {
			right: 2rem;
		}
	}

	@media screen and (max-width: 480px) {
		.carousel {
			padding: 2rem 1rem;
			margin: 0;
		}

		.beer-image-wrapper {
			padding: 1rem;
			border-radius: 0.85rem;
			margin: 0 auto;
			width: 100%;
			max-width: 320px;
		}

		.beer-image-wrapper img {
			max-height: 300px;
			justify-self: center;
		}

		.beer-layout {
			justify-items: center;
		}

		.stat .value {
			font-size: 1.75rem;
		}

		.stat-divider {
			height: 36px;
		}
	}
</style>
