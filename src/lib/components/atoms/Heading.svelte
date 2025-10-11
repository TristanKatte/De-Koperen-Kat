<script lang="ts">
	export let level: number = 1;
	export let text: string;
</script>

<svelte:element this={"h" + level} class="heading">
	{text}
</svelte:element>

<style>
.heading {
	font-weight: 700;
	line-height: 1.2;
}
</style>
