<script lang="ts">
	let { data } = $props();
	import EventsList from '$lib/components/organisms/EventsList.svelte';
</script>

<EventsList events={data.events} />
