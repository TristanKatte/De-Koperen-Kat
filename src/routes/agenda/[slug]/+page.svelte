<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Button from '$lib/components/atoms/Button.svelte';

	let { data } = $props();
	const event = data?.event;

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		gsap.from('.event-detail-card', {
			scrollTrigger: { trigger: '.event-detail-card', start: 'top 80%' },
			opacity: 0,
			y: 40,
			duration: 0.8,
			ease: 'power3.out'
		});
	});
</script>

<section class="event-detail-section">
	<div class="event-detail-card">
		{#if event.image_url}
			<img src={event.image_url} alt={event.title || 'Event afbeelding'} />
		{/if}

		<h1>{event.title}</h1>

		<p class="date">
			📅 {event.date ? new Date(event.date).toLocaleDateString('nl-NL') : 'Datum volgt'}
		</p>

		<p class="location">{event.location}</p>

		<p class="description">{event.description || 'Beschrijving nog niet beschikbaar.'}</p>

		<div class="buttons">
			{#if event.external_url}
				<Button
					href={event.external_url}
					label="Meer informatie"
					target="_blank"
					rel="noopener noreferrer"
				/>
			{/if}
			<Button href="/agenda" label="Terug naar overzicht" />
		</div>
	</div>
</section>

<style>
.event-detail-section {
	background-color: var(--background-color); /* lichte achtergrond */
	padding: 5rem 1.5rem;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	min-height: 100vh;
}

.event-detail-card {
	background: var(--background-alt); /* kaartkleur */
	border-radius: 1rem;
	padding: 2rem;
	max-width: 800px;
	width: 100%;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.event-detail-card img {
	width: 100%;
	height: 300px;
	object-fit: cover;
	border-radius: 0.5rem;
}

h1 {
	font-size: 2rem;
	color: var(--text-color-alt);
	margin-bottom: 0.5rem;
}

.date,
.location {
	font-size: 0.95rem;
	color: var(--text-color-alt);
}

.description {
	font-size: 1rem;
	line-height: 1.5;
	color: var(--text-color-alt);
}

.buttons {
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	margin-top: 1rem;
}
</style>
