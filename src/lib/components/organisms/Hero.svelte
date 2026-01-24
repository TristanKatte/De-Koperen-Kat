<script lang="ts">
	export const ssr = false;

	import { onMount } from 'svelte';

	let heroSection: HTMLElement | null = null;
	let imageEls: HTMLImageElement[] = [];

	const images = [
		{
			png: '/images/brewery-hero.png',
			webp: '/images/brewery-hero.webp',
			width: 1920,
			height: 1080
		},
		{
			png: '/images/bar-gloed.png',
			webp: '/images/bar-gloed.webp',
			width: 1920,
			height: 1080
		},
		{
			png: '/images/vergisting-ketels.png',
			webp: '/images/vergisting-ketels.webp',
			width: 1920,
			height: 1080
		}
	];

	let current = 0;
	let gsap: typeof import('gsap').gsap | null = null;

	onMount(async () => {
		if (!heroSection) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const gsapModule = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		const { SplitText } = await import('gsap/SplitText');

		gsap = gsapModule.gsap;
		gsap.registerPlugin(ScrollTrigger, SplitText);

		// ===== Hero text animaties =====
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
			scrollTrigger: { trigger: heroSection, start: 'top 85%' }
		});

		if (logoEl) tl.from(logoEl, { opacity: 0, x: -80, duration: 0.6 });
		if (splitTitle)
			tl.from(
				splitTitle.chars,
				{
					opacity: 0,
					y: 40,
					scale: 0.8,
					stagger: 0.03,
					duration: 0.45,
					ease: 'power3.out'
				},
				'-=0.3'
			);
		if (splitSubtitle)
			tl.from(splitSubtitle.words, { opacity: 0, y: 20, stagger: 0.05, duration: 0.4 }, '-=0.4');
		if (buttons.length)
			tl.from(buttons, { opacity: 0, y: 15, stagger: 0.12, duration: 0.4 }, '-=0.3');

		// ===== Crossfade hero images =====
		if (!prefersReducedMotion && imageEls.length > 1) {
			gsap.set(imageEls, { opacity: 0 });
			gsap.set(imageEls[0], { opacity: 1 });

			setInterval(() => {
				const next = (current + 1) % imageEls.length;
				gsap!.to(imageEls[current], { opacity: 0, duration: 0.6 });
				gsap!.to(imageEls[next], { opacity: 1, duration: 0.8 });
				current = next;
			}, 7000);
		}
	});
</script>

<section bind:this={heroSection} class="hero">
	<div class="hero-media">
		{#each images as img, i}
			<picture class="hero-picture">
				<source srcset={img.webp} type="image/webp" />
				<img
					bind:this={imageEls[i]}
					src={img.png}
					width={img.width}
					height={img.height}
					alt=""
					aria-hidden="true"
					loading={i === 0 ? 'eager' : 'lazy'}
				/>
			</picture>
		{/each}
		<div class="hero-overlay"></div>
	</div>

	<div class="hero-content">
		<div class="hero-top">
			<img
				src="/images/dkk-logo.png"
				alt="Stadsbrouwerij De Koperen Kat"
				class="logo"
				width="260"
				height="260"
			/>

			<div class="hero-text">
				<h1 class="hero-title">
					Welkom bij
					<span class="no-break">
						Stadsbrouwerij<br />De Koperen Kat
					</span>
				</h1>
				<p class="hero-subtitle">De oudste stadsbrouwerij van Delft</p>
				<div class="hero-actions">
					<a href="/bieren" class="btn btn-primary">Bekijk onze bieren</a>
					<a href="/proeflokaal" class="btn btn-secondary">Boek een proeflokaal</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100svh;
		display: grid;
		place-items: center;
		overflow: visible;
		color: #fff;
		container-type: inline-size;
		container-name: hero;
	}

	/* Media wrapper */
	.hero-media {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
	}

	.hero-picture {
		position: absolute;
		inset: 0;
	}

	.hero-picture img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		will-change: opacity;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		z-index: 1;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		padding: 2.5rem 1.5rem;
		max-width: 90rem;
		margin: 0 auto;
		text-align: center;
	}

	.hero-top {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.logo {
		max-width: 250px;
		height: auto;
	}

	.hero-text {
		text-align: left;
		max-width: 600px;
	}

	.hero-title {
		font-family: 'Noticia Text', serif;
		font-size: clamp(1.5rem, 4vw + 1rem, 4.5rem);
		line-height: 1.1;
		font-weight: 700;
		color: #fff;
		margin: 0;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
	}

	.hero-subtitle {
		font-family: 'Ubuntu', sans-serif;
		font-size: clamp(1.25rem, 2.5vw, 2rem);
		margin: 0;
		color: #f2f2f2;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	}

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

	.btn-primary {
		background-color: #ed651c;
		color: #fff;
	}
	.btn-primary:hover {
		background-color: var(--cta-hover);
		transform: scale(1.05);
	}

	.btn-secondary {
		border: 2px solid #ed651c;
		color: #f5f5f0;
		background: transparent;
	}
	.btn-secondary:hover {
		background-color: var(--cta-hover);
		color: #fff;
	}

	@container hero (max-width: 22.5rem) {
		.hero-actions {
			justify-content: center;
		}

		.btn {
			width: 100%;
			text-align: center;
		}

		.hero-text {
			text-align: center;
		}

		.hero-title,
		.hero-subtitle {
			text-align: center;
		}

		.hero-actions {
			justify-content: center;
		}

		.hero-actions .btn {
			width: 100%;
			text-align: center;
		}

		.hero-media {
			overflow: hidden;
		}

		.hero-picture img {
			object-position: center 40%;
			width: 100%;
			height: 100%;
		}
	}

	/* Desktop layout */
	@container hero (min-width: 50rem) {
		.hero-content {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 4rem;
		text-align: left;
		justify-items: start;
	}

	.hero-top {
		display: contents;
	}

	.hero-text {
		max-width: 70ch;
	}

	.hero-actions {
		justify-content: flex-start;
	}
	}

 @container hero (max-width: 37.5rem) {
	.hero-picture img {
		object-position: center 30%;
	}

	.hero-title,
	.hero-subtitle {
		text-align: center;
	}
}


  @media (prefers-reduced-motion: reduce) {
    .hero-picture img {
      transition: none !important;
    }
  }
</style>
