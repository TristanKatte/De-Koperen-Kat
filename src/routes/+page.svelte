<script lang="ts">
	import Hero from '$lib/components/organisms/Hero.svelte';
	import About from '$lib/components/organisms/About.svelte';
	import BeersSection from '$lib/components/organisms/BeerSection.svelte';
	import EventsSection from '$lib/components/organisms/EventSection.svelte';
	import TastingSection from '$lib/components/organisms/TastingSection.svelte';

	interface Props {
		// ✅ Svelte 5 syntax: SSR props
		data: {
			beers: any[];
			events: any[];
		};
	}

	let { data }: Props = $props();

	const beers = data.beers ?? [];
	const events = data.events ?? [];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Hero />
<main>
	<About />
	<BeersSection {beers} />
	<EventsSection {events} />
	<TastingSection />
</main>

