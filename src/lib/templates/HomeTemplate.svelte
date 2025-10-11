<script lang="ts">
	import HeroBanner from '$lib/molecules/HeroBanner.svelte';
	import FeaturedBeers from '$lib/organisms/FeaturedBeers.svelte';
	import UpcomingEvents from '$lib/organisms/UpcomingEvents.svelte';

	export let hero;
	export let beers;
	export let events;
</script>

<main>
	<HeroBanner {...hero} />
	<FeaturedBeers {beers} />
	<UpcomingEvents {events} />
</main>
