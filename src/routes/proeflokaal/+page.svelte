<script lang="ts">
  import TastingRoomTabs from '$lib/components/organisms/TastingRoomTabs.svelte';
  import { page } from '$app/stores';

  export let data;
</script>

<svelte:head>
  <title>Proeflokaal - Onze Brouwerij</title>
  <meta
    name="description"
    content="Bezoek ons proeflokaal tijdens openingstijden of huur het af voor jouw evenement. Ontdek onze evenementen en vier met ons mee!"
  />
</svelte:head>

<TastingRoomTabs form={$page.form ?? data.form} />
