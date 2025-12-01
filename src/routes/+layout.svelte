<script lang="ts">
  import Header from '$lib/components/organisms/Header.svelte';
  import Footer from '$lib/components/organisms/Footer.svelte';
  import { onMount } from 'svelte';
  import { fade, scale, fly } from 'svelte/transition';
  import { onNavigate } from '$app/navigation';

  let { children } = $props();

  // ✅ Correct Svelte 5 runes syntax
  let AgeGateComponent: typeof import('$lib/components/AgeGate.svelte').default | null = null;
  let ageGateLoaded = false;

  onMount(async () => {
    const module = await import('$lib/components/AgeGate.svelte');
    AgeGateComponent = module.default;
    ageGateLoaded = true;
  });

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

<Header />

<div class="page-transition" in:fade={{ duration: 200 }}>
  <div in:scale={{ duration: 250, start: 0.98 }}>
    <div in:fly={{ y: 20, duration: 220 }}>
      {@render children?.()}
    </div>
  </div>
</div>

<Footer />

{#if ageGateLoaded && AgeGateComponent}
  <AgeGateComponent />
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

  :global(.age-gate-backdrop) {
    position: fixed;
    inset: 0;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9998;
  }
  :global(.age-gate-content) {
    text-align: center;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 400px;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
  }
</style>
