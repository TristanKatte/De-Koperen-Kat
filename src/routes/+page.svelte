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

<Hero />
<About />

<BeersSection {beers} />
<EventsSection {events} />

<section class="tasting-section" aria-labelledby="tasting-title">
  <h2 id="tasting-title">Boek een Proeflokaal 🍺</h2>
  <TastingForm showDescription={true} />
</section>

<style>
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 1.5rem;
}

section:nth-child(even) {
  background-color: #4b2e05;
  color: #f5f5f0;
}

section:nth-child(odd) {
  background-color: var(--accent-light);
  color: #f5f5f0;
}

h2 {
  font-size: 2.25rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
}

.tasting-section {
  background: rgba(255, 255, 255, 0.03);
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  section {
    padding: 3rem 1rem;
  }
}
</style>
