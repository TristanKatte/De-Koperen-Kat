<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import { fade, scale, fly } from "svelte/transition";

	import Header from '$lib/components/organisms/Header.svelte';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import AgeGate from '$lib/components/AgeGate.svelte';
	import { browser } from '$app/environment';

	let showAgeGate = browser;

	let { children } = $props();

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
	<!-- 🔥 Gebruik een statische favicon in /static/ -->
	<link rel="icon" type="image/svg+xml" href="/images/dkk-logo-cropped.png" />

	<!-- Global CSS -->
	<link rel="stylesheet" href="/styles/global.css" />
</svelte:head>

<Header />

{#if showAgeGate}
  <AgeGate />
{/if}

<!-- PAGE TRANSITION WRAPPER -->
<div class="page-transition" in:fade={{ duration: 200 }}>
	<div in:scale={{ duration: 250, start: 0.98 }}>
		<div in:fly={{ y: 20, duration: 220 }}>
			{@render children?.()}
		</div>
	</div>
</div>

<Footer />



<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		height: 100%;
	}

	/* Belangrijk voor browser view transitions */
	.page-transition {
		view-transition-name: page;
		min-height: 100vh;
	}
</style>
