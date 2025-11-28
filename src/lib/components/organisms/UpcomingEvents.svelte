<script lang="ts">
	import EventPreviewCard from '$lib/components/molecules/EventPreviewCard.svelte';
	let { events = [] } = $props();
</script>

<section class="upcoming-events">
	<h2>Evenementen</h2>
	<div class="grid">
		{#each events as event}
			<EventPreviewCard {...event} />
		{/each}
	</div>
</section>

<style>
.upcoming-events {
	padding: 4rem 2rem;
	background-color: var(--surface-alt);
}
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 2rem;
}
</style>
