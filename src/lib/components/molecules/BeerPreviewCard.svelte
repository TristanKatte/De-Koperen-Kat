<script lang="ts">
	import Image from '$lib/components/atoms/Image.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	interface Props {
		name: string;
		type: string;
		image: string;
		link: string;
	}

	let {
		name,
		type,
		image,
		link
	}: Props = $props();
</script>

<a href={link} class="beer-card">
	<Image src={image} alt={name} />
	<Heading level={3} text={name} />
	<p>{type}</p>
</a>

<style>
.beer-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 0.5rem;
	text-decoration: none;
	color: inherit;
}
/* .beer-card img {
	width: 100%;
	border-radius: 1rem;
} */
</style>
