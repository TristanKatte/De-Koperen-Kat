<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';

	interface NewsEvent {
		image_url: string;
		title: string;
		description?: string;
		date?: string | null;
		start_date?: string | null;
		end_date?: string | null;
	}

	let { data }: { data: { event: NewsEvent | null } } = $props();
	const event = data.event;

	let isPoster = $state(false);

	function handleImageLoad(event: Event) {
		const img = event.target as HTMLImageElement;
		isPoster = img.naturalHeight > img.naturalWidth * 1.3;
	}

	function formatEventDate(event: NewsEvent): string {
		if (!event) return 'Datum volgt';

		if (event.date) {
			const d = new Date(event.date);
			if (!isNaN(d.getTime())) {
				return d.toLocaleDateString('nl-NL', {
					weekday: 'short',
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				});
			}
		}

		if (event.start_date && event.end_date) {
			const start = new Date(event.start_date);
			const end = new Date(event.end_date);
			if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
				return `${start.toLocaleDateString('nl-NL')} – ${end.toLocaleDateString('nl-NL')}`;
			}
		}

		return 'Datum volgt';
	}
</script>

{#if event}
	<article class="event-detail">
		{#if event.image_url}
			<div class="image-wrapper {isPoster ? 'poster' : ''}">
				<img src={event.image_url} alt={event.title} onload={handleImageLoad} />
			</div>
		{/if}

		<h1>{event.title}</h1>
		<p class="event-date">{formatEventDate(event)}</p>

		<div class="event-description">
			{@html event.description}
		</div>

		<div class="left-button">
			<Button href="/news" label="Terug naar alle evenementen" />
		</div>
	</article>
{:else}
	<p>Evenement niet gevonden.</p>
{/if}

<style>
	.event-detail {
		max-width: 800px;
		margin: 2rem auto;
		padding: 1.5rem;
		background: #f5f2eb;
		border-radius: 1rem;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
	}

	.event-detail h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.event-date {
		font-weight: bold;
		color: #c4661f;
		margin-bottom: 1rem;
	}

	.event-description {
		line-height: 1.6;
		color: #333;
		margin-bottom: 2rem;
    text-align: left;
	}

	.left-button {
		text-align: left;
		margin-top: 2rem;
	}

	img {
		width: 100%;
		height: 350px;
		object-fit: cover;
		border-radius: 1rem;
		margin-bottom: 1rem;
	}

	.image-wrapper {
		width: 100%;
		max-height: 120vh; /* voorkomt overflow bij posters */
		border-radius: 1rem;
		margin-bottom: 1rem;
	}

	
	.image-wrapper img {
		width: 100%;
		height: 300px;
		object-fit: cover;
		display: block;
		border-radius: 1rem;
	}

	/* Posters: volledige poster tonen */
	.image-wrapper.poster img {
		height: auto;
		max-height: 120vh;
		object-fit: cover;
		margin: 0 auto;
	}
</style>
