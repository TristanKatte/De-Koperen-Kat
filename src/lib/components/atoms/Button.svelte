<script lang="ts">
	export let label: string;
	export let href: string | null = null;
	export let onClick: (() => void) | null = null;
	export let target: string | null = null; // nieuw
	export let rel: string | null = null;     // nieuw
</script>

{#if href}
	<a
		href={href}
		on:click={onClick}
		target={target}
		rel={rel}
		class="btn">
		{label}
	</a>
{:else}
	<button on:click={onClick} class="btn">{label}</button>
{/if}


<style>
.btn {
	background: var(--cta-buttons);
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
	background: var(--highlight-color);
}
</style>
