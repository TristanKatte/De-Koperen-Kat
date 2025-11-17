<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import { fade, scale, fly } from "svelte/transition"; // 🔥 FIXED

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


<!-- ✅ PAGE TRANSITION WRAPPER -->
<div class="page-transition" in:fade={{ duration: 200 }}>
  <div in:scale={{ duration: 250, start: 0.98 }}>
    <div in:fly={{ y: 20, duration: 220 }}>
      {@render children?.()}
    </div>
  </div>
</div>


<Footer />



<AgeGate />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		height: 100%;
	}

		.page-transition {
		view-transition-name: page; /* 🔥 zorgt dat browser deze layout meeneemt in transitions */
		min-height: 100vh;
	}
</style>
