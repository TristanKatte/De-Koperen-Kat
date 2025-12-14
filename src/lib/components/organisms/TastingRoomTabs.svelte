<script lang="ts">
  import TabButton from '$lib/components/atoms/TabButton.svelte';
  import VisitPanel from './VisitPanel.svelte';
  import RentalPanel from './RentalPanel.svelte';
  import EventPanel from './EventPanel.svelte';

  export let form;

  let activeTab: 'bezoeken' | 'afhuren' | 'evenementen' = 'bezoeken';

  const setTab = (tab: typeof activeTab) => {
    activeTab = tab;
  };
</script>

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
  <VisitPanel form={form} />
{:else if activeTab === 'afhuren'}
  <RentalPanel form={form} />
{:else}
  <EventPanel form={form} />
{/if}

<style>
.tabs {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
}
</style>
