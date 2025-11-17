<script lang="ts">
	export let src: string;
	export let alt: string = '';
	export let width: number | string = '100%';
	export let height: number | string = 'auto';
</script>

<img {src} {alt} {width} {height} loading="lazy" class="image" />

<style>
.image {
	border-radius: 1rem;
	object-fit: cover;
}
</style>
