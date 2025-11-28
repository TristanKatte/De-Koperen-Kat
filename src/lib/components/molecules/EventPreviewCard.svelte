<script lang="ts">
	import Image from '$lib/components/atoms/Image.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	interface Props {
		title: string;
		date: string;
		image: string;
		link: string;
	}

	let {
		title,
		date,
		image,
		link
	}: Props = $props();
</script>

<a href={link} class="event-card">
	<Image src={image} alt={title} />
	<Heading level={3} text={title} />
	<p>{date}</p>
</a>

<style>
.event-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	text-decoration: none;
	color: inherit;
}
</style>
