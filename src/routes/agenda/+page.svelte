<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Button from '$lib/components/atoms/Button.svelte';

	gsap.registerPlugin(ScrollTrigger);

	let { data } = $props();
	const events = data?.events || [];

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		gsap.utils.toArray<HTMLElement>('.event-card').forEach((el, i) => {
			gsap.from(el, {
				scrollTrigger: { trigger: el, start: 'top 90%' },
				opacity: 0,
				y: 40,
				duration: 0.8,
				delay: i * 0.1,
				ease: 'power3.out'
			});
		});
	});
</script>

<section class="events-overview" aria-labelledby="events-title">
	<h1 id="events-title">Agenda</h1>

	{#if events.length > 0}
		<div class="grid">
			{#each events as event}
				<article class="event-card" aria-label={`Evenement: ${event.title || 'Onbekend evenement'}`}>
					{#if event.image_url}
						<img src={event.image_url} alt={event.title || 'Evenement afbeelding'} />
					{:else}
						<div class="event-placeholder" aria-hidden="true">🎪</div>
					{/if}

					<div class="event-content">
						<h2>{event.title || 'Nog geen titel beschikbaar'}</h2>
						<p class="date">
							📅 {event.date ? new Date(event.date).toLocaleDateString('nl-NL') : 'Datum volgt'}
						</p>

						<p class="description">
							{#if event.description}
								{event.description.length > 120
									? event.description.slice(0, 120) + '…'
									: event.description}
							{:else}
								Beschrijving nog niet beschikbaar.
							{/if}
						</p>

						<Button href={`/agenda/${event.slug}`} label="Bekijk details" />
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<p class="empty-message" role="status">Er staan momenteel geen evenementen gepland 🎟️</p>
	{/if}
	<Button href="/" label="Terug naar home" />
</section>

<style>
	.events-overview {
		background: var(--background-color);
		color: var(--text-color-alt);
		padding: 6rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		text-align: center;
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 3rem;
		color: var(--text-color, #111);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2.5rem;
		max-width: 1200px;
		width: 100%;
		margin-bottom: 1rem;
	}

	.event-card {
		background: var(--background-alt);
		color: var(--text-color-alt);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
		display: flex;
		flex-direction: column;
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
	}

	.event-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
		border-color: var(--color-senary, #c5b48a);
		color: var(--text-color);
	}

	img {
		width: 100%;
		height: 220px;
		object-fit: cover;
	}

	.event-placeholder {
		width: 100%;
		height: 220px;
		background: rgba(0, 0, 0, 0.05);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
	}

	.event-content {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
		color: var(--background-alt);
	}

	h2 {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--text-color-alt);
		margin-top: 0.5rem;
	}

	.date {
		font-size: 0.95rem;
		color: var(--text-color-alt);
	}

	.description {
		font-size: 1rem;
		color: var(--text-color-alt);
		line-height: 1.6;
		margin: 0.5rem 0 1.5rem;
		flex-grow: 1;
	}

	.event-content :global(.btn) {
		align-self: flex-start;
		margin-top: auto;
	}

	.empty-message {
		text-align: center;
		margin-top: 3rem;
		font-size: 1.2rem;
		color: #666;
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 3rem;
		}
	}
</style>
