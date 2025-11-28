<script lang="ts">
	interface Props {
		src: string;
		alt?: string;
		width?: number | string;
		height?: number | string;
	}

	let {
		src,
		alt = '',
		width = '100%',
		height = 'auto'
	}: Props = $props();
</script>

<img {src} {alt} {width} {height} loading="lazy" class="image" />

<style>
.image {
	border-radius: 1rem;
	object-fit: cover;
}
</style>
