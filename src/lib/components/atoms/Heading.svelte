<script lang="ts">
	interface Props {
		level?: number;
		text: string;
	}

	let { level = 1, text }: Props = $props();
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
