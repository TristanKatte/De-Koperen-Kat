<script lang="ts">
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Image from '$lib/components/atoms/Image.svelte';

	export let title: string;
	export let subtitle: string;
	export let image: string;
	export let ctaLabel: string;
	export let ctaLink: string;
</script>

<section class="hero">
	<div class="hero__content">
		<Heading level={1} text={title} />
		<p>{subtitle}</p>
		<Button label={ctaLabel} href={ctaLink} />
	</div>

	<div class="hero__image">
		<Image src={image} alt={title} />
	</div>
</section>

<style>
.hero {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
	padding: 4rem 2rem;
}
.hero__content {
	max-width: 50%;
}
.hero__image {
	flex: 1;
}
</style>
