<script lang="ts">
	export let label: string;
	export let href: string | null = null;
	export let onClick: (() => void) | null = null;
</script>

{#if href}
	<a class="btn" href={href}>{label}</a>
{:else}
	<button class="btn" on:click={onClick}>{label}</button>
{/if}

<style>
.btn {
	background: var(--color-accent);
	color: white;
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	font-weight: 600;
	text-decoration: none;
	transition: 0.3s;
}
.btn:hover {
	background: var(--color-accent-dark);
}
</style>
