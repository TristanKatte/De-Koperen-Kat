<script lang="ts">
	import EventCard from '$lib/components/molecules/EventCard.svelte';

	interface Event {
		id: string;
		title: string;
		image?: string;
		description?: string;
		date?: string;
		start_date?: string;
		end_date?: string;
	}

	let { events }: { events: Event[] } = $props();

	// Functie om één datum te krijgen (voor single-day) of start van range
	function getDisplayDate(event: Event): Date {
		if (event.start_date) return new Date(event.start_date);
		if (event.date) return new Date(event.date);
		return new Date(); // fallback
	}
	
</script>

<div class="events-banner">
	<h1>
		Voor het laatste nieuws zie de
		<a href="/agenda" class="banner-link">agenda</a>
		&amp; op
		<a
			href="https://www.facebook.com/dekoperenkat/"
			target="_blank"
			rel="noopener noreferrer"
			class="banner-link">Facebook</a
		>!
	</h1>

	<!-- Recurring events onder de h1 -->
	<div class="recurring-events">
		🎤 Elke donderdag: Karaoke &nbsp; | &nbsp; 🎸 Elke zondag: Live muziek
	</div>
</div>

<section class="events-section">
	{#if events.length > 0}
		<div class="agenda-grid">
			{#each events as event (event.id)}
				<div class="agenda-item">
					<div class="agenda-date">
						<span class="day">{getDisplayDate(event).getDate()}</span>
						<span class="month"
							>{getDisplayDate(event).toLocaleDateString('nl-NL', { month: 'short' })}</span
						>
					</div>

					<div class="agenda-card">
						<EventCard {event} />
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="no-events">Er staan momenteel geen evenementen gepland.</p>
	{/if}
</section>

<style>
	.events-banner {
		display: flex;
		flex-direction: column; /* belangrijk zodat h1 boven recurring staat */
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 1.5rem;
		background-color: var(--accent);
		color: var(--text-color-alt);
		border-radius: 1rem;
		width: 100%;
	}

	/* Alleen h1 klikbaar */
	.events-banner a {
		text-decoration: none;
		color: inherit;
	}

	.events-banner h1 {
		margin: 0;
		font-size: 1.8rem;
	}

	.banner-link {
		color: var(--text-color-alt);
		font-weight: 700;
		text-decoration: underline;
		transition: color 0.2s ease;
	}

	.banner-link:hover {
		color: var(--text-color);
	}

	.recurring-events {
		text-align: center;
		margin: 1rem;
		font-weight: 600;
		color: var(--text-color-alt);
		font-size: 1rem;
	}

	/* Hover effect */
	.events-banner:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
	}

	.events-section {
		width: 100%;
		min-height: 110vh;
		margin: 0 auto;
		padding: 2rem 1rem;
		background: var(--background-alt);
		container-type: inline-size;
		container-name: events-overview;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
		color: var(--text-color-alt);
	}

	.agenda-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.agenda-item {
		display: grid;
		grid-template-columns: 70px auto;
		align-items: center;
		gap: 1rem;
	}

	.agenda-date {
		background: #f0e4d0;
		border-radius: 1rem;
		padding: 1rem;
		text-align: center;
		font-weight: bold;
		line-height: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
		transform: rotate(-2deg);
	}

	.day {
		font-size: 1.8rem;
	}

	.month {
		text-transform: uppercase;
		font-size: 0.9rem;
		color: #d2691e;
	}

	@container events-overview (min-width: 48rem) {
		.agenda-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.agenda-item {
			grid-template-columns: 100px auto;
		}

		h1 {
			font-size: 2.5rem;
		}
	}

	.no-events {
		text-align: center;
		font-size: 1.2rem;
		color: #666;
	}
</style>
