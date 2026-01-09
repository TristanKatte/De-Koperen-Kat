<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	let { data } = $props();
	const vacancy = data.vacancy;
</script>

{#if vacancy}
	<article class="vacature-detail">
		{#if vacancy.image_url}
			<img src={vacancy.image_url} alt={vacancy.title} />
		{/if}

		<h1>{vacancy.title}</h1>

		<div class="description">
			{@html vacancy.description}
		</div>

		<h2>Verantwoordelijkheden</h2>
		<ul>
			{#each vacancy.responsibilities.split(',') as responsibility}
				<li>{responsibility.trim()}</li>
			{/each}
		</ul>

		<Button href={`mailto:${vacancy.contact_email}`} label="Solliciteer nu" />
		<Button href="/vacatures" label="Terug naar overzicht" />
	</article>
{:else}
	<p>Vacature niet gevonden.</p>
{/if}

<style>
	.vacature-detail {
		max-width: 800px;
		background: #f5f2eb;
		padding: 1.5rem;
		margin: 2rem auto;
		border-radius: 1rem;
	}

	img {
		width: 100%;
		height: auto;
		max-height: 320px;
		object-fit: cover;
		border-radius: 1rem;
		margin-bottom: 1rem;
	}

	h1 {
		margin-bottom: 1rem;
	}

	.description {
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	ul {
		list-style: '🎯';
		margin-left: 1.5rem;
		margin-bottom: 2rem;
	}

	li {
		margin-bottom: 0.5rem;
	}
</style>
