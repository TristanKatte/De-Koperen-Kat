<script lang="ts">
  import Hero from '$lib/components/organisms/Hero.svelte';
  import About from '$lib/components/organisms/About.svelte';
  import BeersSection from '$lib/components/organisms/BeerSection.svelte';
  import EventsSection from '$lib/components/organisms/EventSection.svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { SplitText } from 'gsap/SplitText';
	import TastingSection from '$lib/components/organisms/TastingSection.svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let { data } = $props();
  const beers = data.beers || [];
  const events = data.events || [];
</script>
<svelte:head>
  <title>Home</title>
</svelte:head>

<Hero />
<About />

<BeersSection {beers} />
<EventsSection {events} />
<TastingSection />

<style>
  :global(html) {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }
</style>