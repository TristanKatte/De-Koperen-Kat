<script lang="ts">
	import VacancyCard from '$lib/components/molecules/VacancyCard.svelte';

	let { data } = $props();
	const vacancies = data.vacancies ?? [];
</script>

<section class="vacature-overview">
	<h1>Vrijwilligers gezocht</h1>
	<p class="intro">
		Op het moment zitten we goed in het vaste personeel, maar hebben we altijd plek
		voor vrijwilligers die overdag willen meehelpen met hand-en-spandiensten.
	</p>

	{#if vacancies.length > 0}
		<div class="vacature-grid">
			<VacancyCard v={vacancies[0]}  />
			{#each vacancies.slice(1) as v}
				<VacancyCard {v}  />
			{/each}
		</div>
	{:else}
		<p>Er zijn op dit moment geen openstaande vrijwilligersplekken.</p>
	{/if}
</section>

<style>
	.vacature-overview {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
    margin-bottom: 3rem;
	}

	.intro {
		margin-bottom: 2rem;
		color: #555;
	}

	.vacature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 3.5rem;
	}

	@media (min-width: 700px) {
		.vacature-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		/* grote kaart moet 2 kolommen breed worden */
		.vacature-grid :global(.vacancy-card.large) {
			grid-column: span 1;
		}
	}
</style>
