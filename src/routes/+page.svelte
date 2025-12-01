<script lang="ts">
  import Hero from '$lib/components/organisms/Hero.svelte';
  import About from '$lib/components/organisms/About.svelte';
  import BeersSection from '$lib/components/organisms/BeerSection.svelte';
  import EventsSection from '$lib/components/organisms/EventSection.svelte';
  import TastingSection from '$lib/components/organisms/TastingSection.svelte';

  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { SplitText } from 'gsap/SplitText';
  import { onMount } from 'svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // ✅ Svelte 5 syntax voor pagina props
  export let data: {
    beers: any[];
    events: any[];
  };

  const beers = data.beers ?? [];
  const events = data.events ?? [];

  // GSAP animaties alleen in browser
  onMount(() => {
    // animaties hier
  });
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<Hero />
<About />

<BeersSection {beers} />
<EventsSection {events} />
<TastingSection />
