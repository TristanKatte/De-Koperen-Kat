<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import Button from '$lib/components/atoms/Button.svelte';

	export let data;
	const event = data?.event;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;
		gsap.from('.event-detail', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' });
	});
</script>

{#if event}
	<section class="event-detail">
		{#if event.image_url}
			<img src={event.image_url} alt={event.title || 'Evenement afbeelding'} class="hero" />
		{/if}

		<div class="content">
			<h1>{event.title || 'Evenement zonder titel'}</h1>
			<p class="date">
				📅 {event.date ? new Date(event.date).toLocaleDateString('nl-NL') : 'Datum nog niet bekend'}
			</p>
			<p>
				{#if event.description}
					{event.description}
                    {event.external_url ? ` (${event.external_url})` : ''}
				{:else}
					Er is nog geen beschrijving beschikbaar voor dit evenement.
				{/if}
			</p>
			<Button href="/events" label="← Terug naar overzicht" />
		</div>
	</section>
{:else}
	<p class="empty-message" role="status">Evenement niet gevonden.</p>
{/if}

<style>
	.event-detail {
		max-width: 800px;
		margin: 0 auto;
		padding: 4rem 1.5rem;
		color: var(--text-color);
	}

	img.hero {
		width: 100%;
		max-height: 400px;
		object-fit: cover;
		border-radius: 1rem;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.date {
		font-style: italic;
		margin-bottom: 1rem;
		color: var(--text-color);
	}

	p {
		line-height: 1.6;
	}

	.empty-message {
		text-align: center;
		margin-top: 5rem;
		font-size: 1.2rem;
		color: #ccc;
	}
</style>
