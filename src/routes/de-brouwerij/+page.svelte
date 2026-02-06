<script lang="ts">
  import { aboutContent } from '$lib/content/about';
  import TextPhotoSection from '$lib/components/organisms/TextPhotoSection.svelte';
  import StatsCounters from '$lib/components/organisms/StatsCounters.svelte';
  import PartnerSection from '$lib/components/organisms/PartnerSection.svelte';
  import RentBrewingSection from '$lib/components/organisms/RentBrewingSection.svelte';
</script>

<svelte:head>
  <title>Over ons</title>
  <meta name="description" content="Over ons: {import.meta.env.VITE_APP_NAME}" />
</svelte:head>

<main class="about-section">
  
  
  {#each aboutContent.sections as section, i}
    <TextPhotoSection 
      title={section.title}
      content={section.content}
      photos={section.photos}
      index={i}
    />
  {/each}
  
  <StatsCounters counters={aboutContent.counters} />
  
  <PartnerSection partners={aboutContent.partners} />
  
  <RentBrewingSection />
</main>

<style>
  .about-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1.5rem;
    background-color: var(--background-color);
    min-height: 100dvh;
    width: 100%;
  }
</style>