<script lang="ts">
	import TabButton from '$lib/components/atoms/TabButton.svelte';
	import VisitPanel from './VisitPanel.svelte';
	import RentalPanel from './RentalPanel.svelte';
	import EventPanel from './EventPanel.svelte';

	export let form;

	const tabs = ['bezoeken', 'afhuren', 'evenementen'] as const;
	type Tab = (typeof tabs)[number];

	let activeTab: Tab = 'bezoeken';

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

<div role="tablist" aria-label="Proeflokaal tabs" class="tabs">
	<TabButton
		id="tab-bezoeken"
		ariaControls="tabpanel-bezoeken"
		active={activeTab === 'bezoeken'}
		on:select={() => (activeTab = 'bezoeken')}
	>
		Bezoeken
	</TabButton>

	<TabButton
		id="tab-afhuren"
		ariaControls="tabpanel-afhuren"
		active={activeTab === 'afhuren'}
		on:select={() => (activeTab = 'afhuren')}
	>
		Afhuren
	</TabButton>

	<TabButton
		id="tab-evenementen"
		ariaControls="tabpanel-evenementen"
		active={activeTab === 'evenementen'}
		on:select={() => (activeTab = 'evenementen')}
	>
		Evenementen
	</TabButton>
</div>

{#if activeTab === 'bezoeken'}
	<VisitPanel {form} />
{:else if activeTab === 'afhuren'}
	<RentalPanel {form} />
{:else}
	<EventPanel />
{/if}

<style>
	.tabs {
		display: flex;
		gap: 1rem;
		border-bottom: 1px solid #ddd;
		margin-bottom: 1.5rem;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
    max-width: 1200px;
    margin-top: 2rem;
    justify-content: center;
	}
</style>
