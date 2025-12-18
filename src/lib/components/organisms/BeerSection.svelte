<script lang="ts">
	export const ssr = false;
	import Button from '$lib/components/atoms/Button.svelte';
	import Carousel from '$lib/components/organisms/Carousel.svelte';

	interface Props {
		beers?: any[];
	}

	let { beers = [] }: Props = $props();
</script>

<section class="beers-section" aria-labelledby="beers-title">
	<h2 id="beers-title">Onze Bieren</h2>

<Carousel ariaLabel="Onze bieren"  items={beers.slice(0, 8)} />

	<div class="centered-button">
		<Button href="/beers" label="Bekijk alle bieren" />
	</div>
</section>

<style>
	.beers-section {
		background-color: var(--background-alt);
		color: #f5f5f0;
		padding: 5rem 1.5rem;
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}

	h2 {
		font-size: 2.25rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 2.5rem;
		color: var(--text-color-alt);
	}
	
	/* --- Grote knop onder het grid --- */
	.centered-button {
		margin-top: 3rem;
		text-align: center;
	}

	/* --- Responsief --- */
	@media (max-width: 768px) {
		.beers-section {
			padding: 3rem 1rem;
		}


		.centered-button {
			margin-top: 2.5rem;
		}
	}
</style>
