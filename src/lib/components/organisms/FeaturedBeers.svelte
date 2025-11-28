<script lang="ts">
	import BeerPreviewCard from '$lib/components/molecules/BeerPreviewCard.svelte';

	let { beers = [] } = $props();
</script>

<section class="featured-beers">
	<h2>Onze Bieren</h2>
	<div class="grid">
		{#each beers as beer}
			<BeerPreviewCard {...beer} />
		{/each}
	</div>
</section>

<style>
.featured-beers {
	padding: 4rem 2rem;
}
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 2rem;
}
</style>
