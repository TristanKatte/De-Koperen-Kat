<script lang="ts">
	export const ssr = false;
	import { onMount } from 'svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	interface Props {
		events?: any[];
	}

	let { events = [] }: Props = $props();

	let sectionEl: HTMLElement | null;

	onMount(async () => {
		if (!sectionEl) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(sectionEl.querySelectorAll('.event-card'), {
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 80%'
			},
			opacity: 0,
			y: 40,
			duration: 0.7,
			stagger: 0.15,
			ease: 'power2.out'
		});
	});
</script>

<section
	class="events-section section-divider"
	bind:this={sectionEl}
	aria-labelledby="events-title"
>
	<h2 id="events-title">Agenda</h2>

	<div class="events-grid">
		<div class="events-column">
			{#each events.slice(0, 4) as event}
				<article class="event-card">
					<div class="event-date">
						<span class="day">{new Date(event.date).getDate()}</span>
						<span class="month"
							>{new Date(event.date).toLocaleString('nl-NL', { month: 'short' })}</span
						>
						<span class="year">{new Date(event.date).getFullYear()}</span>
					</div>

					<div class="event-info">
						<h3>{event.title}</h3>
						<p>{event.location}</p>
						<p>{event.time}</p>

						<div class="card-button">
							{#if event.external_url}
								<a
									href={event.external_url}
									target="_blank"
									rel="noopener noreferrer"
									class="btn btn--primary"
								>
									Meer info
								</a>
							{:else}
								<Button href={`/nieuws/${event.slug}`} label="Meer info" />
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="events-column">
			{#each events.slice(4, 8) as event}
				<article class="event-card">
					<div class="event-date">
						<span class="day">{new Date(event.date).getDate()}</span>
						<span class="month"
							>{new Date(event.date).toLocaleString('nl-NL', { month: 'short' })}</span
						>
						<span class="year">{new Date(event.date).getFullYear()}</span>
					</div>

					<div class="event-info">
						<h3>{event.title}</h3>
						<p>{event.location}</p>
						<p>{event.time}</p>

						<div class="card-button">
							{#if event.external_url}
								<a
									href={`/nieuws/${event.slug}`}
									target="_blank"
									rel="noopener noreferrer"
									class="btn btn--primary"
								>
									Meer info
								</a>
							{:else}
								<Button href={`/nieuws/${event.slug}`} label="Meer info" />
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<div class="centered-button">
		<Button href="/agenda" label="Bekijk agenda" />
		<Button href="/nieuws" label="Bekijk alle komende evenementen" />
	</div>
</section>

<style>
	.events-section {
		position: relative;
		background-color: var(--background-soft);
		color: var(--text-color);
		padding: 5rem 1.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		container-type: inline-size;
		container-name: events;
	}

	.events-section::before {
		content: '';
		position: absolute;
		left: 0; /* of right:0 als je afwisseling wil */
		top: 0;
		width: 6px;
		height: 100%;
		background: var(--accent);
		pointer-events: none;
		opacity: 0.9;
	}

	h2 {
		font-size: 2.25rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 2.5rem;
		color: var(--text-color);
	}

	.events-grid {
		display: grid;
		grid-template-columns: 1fr;
		align-items: start;
		gap: 2rem;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.events-column {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: stretch;
	}

	/* ----- Event card ----- */
	.event-card {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		background: #fff;
		border-radius: 1rem;
		border: 1px solid var(--line-subtle);
		border-top: 4px solid var(--accent);
		padding: 1.5rem;
		gap: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		min-height: 180px;
	}

	.event-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
	}

	/* ----- Datum ----- */
	.event-date {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 80px;
		max-height: 100px;
		background: var(--cta-secondary);
		color: var(--text-color);
		border-radius: 0.5rem;
		padding: 0.5rem;
		text-align: center;
	}

	.event-date .day {
		font-size: 1.75rem;
		font-weight: 700;
	}

	.event-date .month,
	.event-date .year {
		font-size: 0.9rem;
		text-transform: uppercase;
	}

	/* ----- Info ----- */
	.event-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.event-info h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-color);
		line-height: 1.3;
		max-height: 3.9rem; /* bv. 2 regels */
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.event-info p {
		margin: 0.25rem 0;
		line-height: 1.4;
		color: var(--text-color);
	}

	/* ----- Knop ----- */
	.card-button {
		margin-top: auto;
		margin-top: 1.5rem;
		display: flex;
		justify-content: flex-start;
	}

	.btn {
		display: inline-block;
		padding: 0.7rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		text-decoration: none;
		text-align: center;
		background-color: var(--cta-secondary);
		color: #fff;
		transition:
			background-color 0.25s ease,
			transform 0.25s ease;
	}

	.btn:hover {
		background-color: #c74d0d;
		transform: scale(1.05);
	}

	.centered-button {
		text-align: center;
		margin-top: 6rem;
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.section-divider {
		position: relative;
	}

	.section-divider::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 120px;
		background: linear-gradient(to bottom, transparent, var(--background-warm));
		pointer-events: none;
	}

	@container events (min-width: 48rem) {
		.events-section {
			padding: 4rem 1.5rem;
		}

		.events-grid {
			grid-template-columns: 1fr 1fr;
		}

		.events-column {
			width: 100%;
		}

		h2 {
			font-size: 2.5rem;
		}

		.centered-button {
			margin-top: 4rem;
		}
	}

	@container events (min-width: 70rem) {
		.events-grid {
			gap: 3rem;
		}
	}
</style>
