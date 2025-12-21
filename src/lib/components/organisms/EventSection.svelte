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

<section class="events-section" bind:this={sectionEl} aria-labelledby="events-title">
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
								<Button href={`/news/${event.slug}`} label="Meer info" />
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
									href={`/news/${event.slug}`}
									target="_blank"
									rel="noopener noreferrer"
									class="btn btn--primary"
								>
									Meer info
								</a>
							{:else}
								<Button href={`/news/${event.slug}`} label="Meer info" />
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<div class="centered-button">
		<Button href="/agenda" label="Bekijk agenda" />
		<Button href="/news" label="Bekijk alle komende evenementen" />
	</div>
</section>

<style>
	.events-section {
		background-color: var(--accent-light);
		color: var(--text-color);
		padding: 5rem 1.5rem;
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
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
		grid-template-columns: 1fr 1fr;
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
		background: var(--background-alt);
		border-radius: 1rem;
		border: 1px solid #1b1007;
		padding: 1.5rem;
		gap: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		min-height: 180px;
	}

	.event-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
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
		color: var(--text-color-alt);
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
		color: var(--text-color-alt);
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
	}

	@media (max-width: 1024px) {
		.events-grid {
			grid-template-columns: 1fr; /* 1 kolom op tablets en mobiel */
		}
	}

	/* ----- RESPONSIVE ----- */
	@media (max-width: 768px) {
		.events-section {
			padding: 3rem 1rem;
		}

		.event-card {
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		}

		.event-info {
			text-align: center;
			align-items: center;
		}

		.event-date {
			width: auto;
			flex-direction: row;
			justify-content: center;
			gap: 0.5rem;
			padding: 0.25rem 0.5rem;
		}

		.event-date .day {
			font-size: 1.5rem;
		}

		.event-date .month,
		.event-date .year {
			font-size: 0.8rem;
		}

		.centered-button {
			margin-top: 2.5rem;
		}
	}
</style>
