<script lang="ts">
	import Button from '../atoms/Button.svelte';
	let { event } = $props();
</script>

<article class="event-card">
	{#if event.image}
		<img class="event-image" src={event.image} alt={event.title} />
	{/if}

	<div class="event-info">
		<h2>{event.title}</h2>

		<p class="event-date">
			{#if event.start_date && event.end_date && event.start_date !== event.end_date}
				{new Date(event.start_date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
				-
				{new Date(event.end_date).toLocaleDateString('nl-NL', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})}
			{:else if event.date}
				{new Date(event.date).toLocaleDateString('nl-NL', {
					weekday: 'short',
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})}
			{:else}
				Datum onbekend
			{/if}
		</p>

		<div class="event-button">
			<Button href={`/news/${event.slug}`} label="Meer informatie" />
		</div>

		<p class="event-description">
			{event.description}
		</p>
	</div>
</article>

<style>
	.event-card {
		background: #f5f2eb;
		border-radius: 1rem;
		display: grid;
		grid-template-rows: 200px auto;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
		overflow: hidden;
		cursor: pointer;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.event-card:hover {
		transform: translateY(-6px) rotate(0.5deg);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
	}

	.event-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.event-info {
		padding: 1rem;
	}

	.event-button {
		margin: 1.5rem 0;
	}

	.event-date {
		font-size: 0.9rem;
		font-weight: bold;
		color: #c4661f;
		margin: 0.25rem 0;
		text-transform: capitalize;
	}

	.event-description {
		color: #444;
		font-size: 0.95rem;
	}
</style>
