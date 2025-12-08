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

	// Functie om een datum-range te tonen
	function formatDateRange(event: Event): string {
		if (event.start_date && event.end_date) {
			const start = new Date(event.start_date);
			const end = new Date(event.end_date);
			return `${start.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}`;
		}
		if (event.date) {
			const d = new Date(event.date);
			return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
		}
		return '';
	}
</script>

<section class="events-section">
	<h1>Evenementen Agenda</h1>

	{#if events.length > 0}
		<div class="agenda-grid">
			{#each events as event (event.id)}
				<div class="agenda-item">
					<div class="agenda-date">
						<span class="day">{getDisplayDate(event).getDate()}</span>
						<span class="month">{getDisplayDate(event).toLocaleDateString('nl-NL', { month: 'short' })}</span>
					</div>

					<div class="agenda-card">
						<EventCard event={event} />
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="no-events">Er staan momenteel geen evenementen gepland.</p>
	{/if}
</section>

<style>
	.events-section {
		width: 100%;
		margin: 0 auto;
		padding: 2rem 1rem;
		background: var(--background-alt); /* Temporary background color for visibility */
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
		font-size: .9rem;
		color: #d2691e;
	}

	@media (min-width: 700px) {
		.agenda-grid {
			grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
		}
	}

	.no-events {
		text-align: center;
		font-size: 1.2rem;
		color: #666;
	}
</style>
