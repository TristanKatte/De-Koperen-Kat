<script lang="ts">
	import { javascript } from '$lib/utils/javascriptEnabled.svelte.js';
	export let menuItems: { title: string; links: { label: string; href: string }[] }[];

	let isOpen = false;

	function toggleMenu() {
		if (!javascript.enabled) return;
		isOpen = !isOpen;
	}
</script>

<nav class:js-enabled={javascript.enabled}>
	<!-- Hamburger button -->
	<button
		class="hamburger"
		aria-label="Open navigatie"
		aria-expanded={isOpen}
		on:click={toggleMenu}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>

	<ul class:is-open={isOpen}>
		{#each menuItems as item}
			<li>
				{#if item.links.length > 1}
					<span>{item.title}</span>
					<ul class="dropdown">
						{#each item.links as link}
							<li><a href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				{:else}
					<a href={item.links[0].href}>{item.title}</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<style>
	/* Basis: altijd zichtbaar voor no-JS */
	nav ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: .95rem;
		font-weight: 600;

	}

	nav li {
		flex: 0 1 auto;
	}

	.dropdown {
		margin-left: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* JS-enabled: menu kan ingeklapt worden */
	nav.js-enabled ul {
		display: none;
		flex-direction: column;
		gap: 1rem;
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease-in-out;
		flex-direction: row;
	}

	nav.js-enabled  li {
		flex: 0 1 auto;
		min-width: 5px;
	}

	nav.js-enabled ul.is-open {
		display: flex;
		max-height: 100vh; /* CSS animatie van openklappen */
	}

	/* Hamburger button alleen zichtbaar met JS */
	.hamburger {
		display: none;
		flex-direction: column;
		gap: 0.4rem;
		background: none;
		border: none;
		cursor: pointer;
	}

	.hamburger span {
		width: 28px;
		height: 3px;
		background: var(--text-color, #000);
		display: block;
		transition: all 0.3s ease;
	}

	/* Desktop styling */
	@media (min-width: 700px) {
		nav.js-enabled ul {
			display: flex;
			flex-direction: row;
			gap: 2rem;
			max-height: none;
		}

		.hamburger {
			display: none;
		}

		.dropdown {
			flex-direction: row;
			gap: 1rem;
			margin-left: 0.5rem;
		}
	}

	/* Mobile hamburger visibility */
	@media (max-width: 699px) {
		nav.js-enabled .hamburger {
			display: flex;
		}
	}
</style>
