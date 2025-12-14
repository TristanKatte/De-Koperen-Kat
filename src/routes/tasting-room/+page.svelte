<script lang="ts">
  import TastingRoomTabs from '$lib/components/organisms/TastingRoomTabs.svelte';
  import { page } from '$app/stores';

  export let data;
</script>

<TastingRoomTabs form={$page.form ?? data.form} />
