<script lang="ts">
	interface Props {
		label: string;
		href?: string | null;
		onClick?: (() => void) | null;
		target?: string | null; // nieuw
		rel?: string | null; // nieuw
	}

	let {
		label,
		href = null,
		onClick = null,
		target = null,
		rel = null
	}: Props = $props();
</script>

{#if href}
	<a
		href={href}
		onclick={onClick}
		target={target}
		rel={rel}
		class="btn">
		{label}
	</a>
{:else}
	<button onclick={onClick} class="btn">{label}</button>
{/if}


<style>
.btn {
	background: var(--cta-buttons);
	color: white;
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	border: 1px solid var(--cta-secondary);
	cursor: pointer;
	font-weight: 600;
	text-decoration: none;
	transition: 0.3s;
}
.btn:hover {
	background: var(--cta-hover);
}
</style>
