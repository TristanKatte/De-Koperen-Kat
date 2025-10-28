<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import Header from '$lib/components/organisms/Header.svelte';
	import AgeGate from '$lib/components/AgeGate.svelte';

	let { children } = $props();

	  // View transitions
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
	<link rel="icon" href={favicon} />
	<!-- ✅ Global CSS hier -->
	<link rel="stylesheet" href="/styles/global.css" />
</svelte:head>

<Header />


{@render children?.()}


<Footer />



<AgeGate />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		height: 100%;
	}
</style>
