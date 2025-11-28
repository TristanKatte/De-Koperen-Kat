<script lang="ts">
	import HeroBanner from '$lib/components/molecules/HeroBanner.svelte';
	import FeaturedBeers from '$lib/components/organisms/FeaturedBeers.svelte';
	import UpcomingEvents from '$lib/components/organisms/UpcomingEvents.svelte';

	let { hero, beers, events } = $props();
</script>

<main>
	<HeroBanner {...hero} />
	<FeaturedBeers {beers} />
	<UpcomingEvents {events} />
</main>
