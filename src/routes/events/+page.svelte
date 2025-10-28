<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Button from '$lib/components/atoms/Button.svelte';

	gsap.registerPlugin(ScrollTrigger);

	export let data;
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
	<h1 id="events-title">Evenementen</h1>

	{#if events.length > 0}
		<div class="grid">
			{#each events as event}
				<article class="event-card" aria-label={`Evenement: ${event.title || 'Onbekend evenement'}`}>
					{#if event.image_url}
						<img src={event.image_url} alt={event.title || 'Evenement afbeelding'} />
					{:else}
						<div class="event-placeholder" aria-hidden="true">🎪</div>
					{/if}

					<h2>{event.title || 'Nog geen titel beschikbaar'}</h2>
					<p class="date">
						📅 {event.date ? new Date(event.date).toLocaleDateString('nl-NL') : 'Datum volgt'}
					</p>

					<p class="description">
						{#if event.description}
							{event.description.length > 120 ? event.description.slice(0, 120) + '…' : event.description}
						{:else}
							Beschrijving nog niet beschikbaar.
						{/if}
					</p>

					<Button href={`/events/${event.slug}`} label="Bekijk details" />
				</article>
			{/each}
		</div>
	{:else}
		<p class="empty-message" role="status">Er staan momenteel geen evenementen gepland 🎟️</p>
	{/if}
</section>

<style>
	section {
		background-color: #3a2605;
		color: #f5f5f0;
		padding: 5rem 1.5rem;
	}

	h1 {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 3rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		align-items: stretch;
	}

	.event-card {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 1rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100%;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.event-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	}

	img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	.event-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 200px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.3rem;
		margin-bottom: 0.5rem;
	}

	.description {
		margin: 1rem 0;
		font-size: 0.95rem;
		line-height: 1.4;
		color: #ddd;
	}

	.empty-message {
		text-align: center;
		margin-top: 3rem;
		font-size: 1.2rem;
		color: #ccc;
	}
</style>
