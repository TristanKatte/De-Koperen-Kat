<script lang="ts">
  import Hero from '$lib/components/organisms/Hero.svelte';
  import About from '$lib/components/organisms/About.svelte';
  import TastingForm from '$lib/components/organisms/TastingForm.svelte';
  import BeersSection from '$lib/components/organisms/BeerSection.svelte';
  import EventsSection from '$lib/components/organisms/EventSection.svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { SplitText } from 'gsap/SplitText';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  export let data;
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
<TastingForm showDescription={true} />

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>