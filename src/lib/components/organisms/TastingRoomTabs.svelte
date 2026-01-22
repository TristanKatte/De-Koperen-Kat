<script lang="ts">
	import VisitPanel from './VisitPanel.svelte';
	import RentalPanel from './RentalPanel.svelte';
	import EventPanel from './EventPanel.svelte';

	export let form;

	const tabs = ['bezoeken', 'afhuren', 'evenementen'] as const;
	type Tab = (typeof tabs)[number];

	let activeTab: Tab = 'bezoeken';

	function select(tab: Tab) {
		activeTab = tab;
		document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
	}

	function onKeydown(e: KeyboardEvent) {
		const index = tabs.indexOf(activeTab);

		if (e.key === 'ArrowRight') {
			activeTab = tabs[(index + 1) % tabs.length];
			e.preventDefault();
		}

		if (e.key === 'ArrowLeft') {
			activeTab = tabs[(index - 1 + tabs.length) % tabs.length];
			e.preventDefault();
		}
	}
</script>

<svelte:window on:keydown={onKeydown} />
<div class="tabs-wrapper">
	<nav class="tabs" aria-label="Proeflokaal navigatie">
		<a href="#bezoeken" id="tab-bezoeken">Bezoeken</a>
		<a href="#afhuren" id="tab-afhuren">Afhuren</a>
		<a href="#evenementen" id="tab-evenementen">Evenementen</a>
	</nav>
</div>

<section id="bezoeken">
	<VisitPanel {form} />
</section>

<section id="afhuren">
	<RentalPanel {form} />
</section>

<section id="evenementen">
	<EventPanel />
</section>

<style>
	.tabs-wrapper {
		position: fixed;
		top: 20;
		z-index: 50;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(255, 255, 255, 0.8);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.tabs {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(6px);
		width: 33.33%;
		margin: 0 auto;
	}

	.tabs a {
		position: relative;
		padding: 0.6rem 1.25rem;
		color: var(--text-color);
		font-weight: 500;
	}

	.tabs a::after {
		content: '';
		position: absolute;
		left: 10%;
		bottom: -0.4rem;
		width: 80%;
		height: 3px;
		background: var(--accent);
		border-radius: 2px;
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	.tabs a:focus::after,
	.tabs a:hover::after {
		transform: scaleX(1);
	}

	@container (max-width: 40rem) {
		.tabs-wrapper {
			position: static;
		}
	}
</style>
