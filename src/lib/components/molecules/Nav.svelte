<script lang="ts">
	import { javascript } from '$lib/utils/javascriptEnabled.svelte.js';
	import { cartCount } from '$lib/stores/cart';
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
		on:click={() => (isOpen = !isOpen)}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>

	<ul class:is-open={isOpen}>
		{#each menuItems as item}
			<li class="menu-group">
				{#if item.links.length > 1}
					<h3 class="menu-heading">{item.title}</h3>
					<ul class="dropdown">
						{#each item.links as link}
							<li><a href={link.href} on:click={() => (isOpen = false)}>{link.label}</a></li>
						{/each}
					</ul>
				{:else}
					<a href={item.links[0].href} on:click={() => (isOpen = false)}>{item.title}</a>
				{/if}
			</li>
		{/each}

		<li class="cart-item">
			<a href="/webshop/cart" class="menu-link cart-link" on:click={() => (isOpen = false)}>
				🛒 Winkelmand
				{#if $cartCount > 0}
					<span class="cart-count">{$cartCount}</span>
				{/if}
			</a>
		</li>
	</ul>
</nav>

<style>
/* Basis: altijd zichtbaar voor no-JS */
nav {
	position: relative;
	z-index: 100;
}

nav ul {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin: 0;
	padding: 0;
	list-style: none;
	font-size: 0.95rem;
	font-weight: 600;
}

nav li {
	flex: 0 1 auto;
}

.menu-group {
	width: 100%;
	text-align: right;
}

.menu-heading {
	display: block;
	letter-spacing: 0.12rem;
	text-transform: uppercase;
	opacity: 0.6;
	margin-bottom: 0.75rem;
}

.menu-link,
.dropdown a {
	display: block;
	width: 100%;
	text-align: center;
	padding: 0.75rem 0;
	font-size: 1.25rem;
}

.dropdown {
	margin-left: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.cart-link {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	font-weight: 600;
	font-size: inherit;
	padding: 0;
}

.cart-item {
	margin-top: 0;
}

.cart-count {
	font-size: 0.65rem;
	background: var(--cta-buttons);
	color: white;
	padding: 0.1rem 0.35rem;
	border-radius: 999px;
	line-height: 1;
}

/* Hamburger basis */
.hamburger {
	display: none;
	flex-direction: column;
	gap: 0.4rem;
	background: none;
	border: none;
	cursor: pointer;
	z-index: 110;
}

.hamburger span {
	display: block;
	width: 25px;
	height: 3px;
	background: #333;
	border-radius: 2px;
}

/* JS-enabled gedrag */
nav.js-enabled ul {
	display: none;
	flex-direction: column;
	gap: 1rem;
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.3s ease-in-out;
}

nav.js-enabled ul.is-open {
	display: flex;
	max-height: 100vh;
}

nav.js-enabled li {
	flex: 0 1 auto;
	min-width: 5px;
}

/* Mobile */
@media (max-width: 699px) {
	nav.js-enabled .hamburger {
		display: flex;
		position: absolute;   /* blijft in header */
		top: -0.5rem;
		right: 1.5rem;
		gap: 0.5rem;
		z-index: 1001;
	}

	nav.js-enabled .hamburger span {
		width: 28px;
		height: 3px;
	}

	nav.js-enabled ul {
		position: fixed;
		inset: 0;
		background: #f5f5f0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		opacity: 0;
		pointer-events: none;
		transform: translateY(-20px);
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	nav.js-enabled ul.is-open {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
	}

	nav.js-enabled li {
		width: 100%;
		text-align: center;
	}

	.cart-item {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}

	.cart-item .cart-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
}

/* Extra kleine schermen (zoals 360px / 22.5rem) */
@media (max-width: 22.5rem) {
	.menu-link,
	.dropdown a,
	.cart-link {
		font-size: 1.1rem;
	}

	.cart-count {
		font-size: 0.75rem;
	}

	
}

/* Desktop */
@media (min-width: 700px) {
	.menu-group {
		width: auto;
		text-align: left;
	}

	.menu-heading {
		display: none;
	}

	.menu-link,
	.dropdown a {
		font-size: 0.95rem;
		padding: 0;
	}

	nav.js-enabled ul {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		max-height: none;
		position: static;
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}

	.dropdown {
		flex-direction: row;
		gap: 1rem;
		margin-left: 0.5rem;
	}

	.hamburger {
		display: none;
	}
}

</style>
