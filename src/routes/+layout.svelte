<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { onMount } from 'svelte';
  import { fade, scale, fly } from "svelte/transition";

  import Header from '$lib/components/organisms/Header.svelte';
  import Footer from '$lib/components/organisms/Footer.svelte';

  let { children } = $props();

  // 🔹 Dynamische client-only AgeGate
  let AgeGate: typeof import('$lib/components/AgeGate.svelte').default | null = null;
  let ageGateLoaded = false;

  onMount(async () => {
    const module = await import('$lib/components/AgeGate.svelte');
    AgeGate = module.default;
    ageGateLoaded = true;
  });

  // Browser-native view transitions
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/images/dkk-logo-cropped.png" />
  <link rel="stylesheet" href="/styles/global.css" />
</svelte:head>

<Header />

<!-- PAGE TRANSITION WRAPPER -->
<div class="page-transition" in:fade={{ duration: 200 }}>
  <div in:scale={{ duration: 250, start: 0.98 }}>
    <div in:fly={{ y: 20, duration: 220 }}>
      {@render children?.()}
    </div>
  </div>
</div>

<Footer />

<!-- 🔹 AgeGate client-only -->
{#if ageGateLoaded && AgeGate}
  <AgeGate />
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
  }

  .page-transition {
    view-transition-name: page;
    min-height: 100vh;
  }
</style>
