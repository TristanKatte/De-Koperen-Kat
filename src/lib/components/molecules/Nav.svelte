<script lang="ts">
	import { javascript } from "$lib/utils/javascriptEnabled.svelte.js";

	let open = false;

	function toggle() {
		if (!javascript.enabled) return; // fallback: JS uit → niet toggelen
		open = !open;
	}
</script>

<nav class={open && javascript.enabled ? "open" : ""}>
	<!-- Hamburger button (werkt alleen als JS actief is) -->
	<button
		type="button"
		class="nav-toggle"
		aria-expanded={open}
		onpointerup={toggle}
		hidden={!javascript.enabled}
	>
		Menu
	</button>

	<!-- Menu items -->
	<ul class="nav-list" data-js={javascript.enabled}>
		<li><a href="/over">Over</a></li>
		<li><a href="/bieren">Bieren</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>

<style>
/* Baseline: menu altijd zichtbaar zonder JS */
.nav-list {
	display: block;
}

/* Als JS aanstaat → CSS behaviour aanpassen */
[data-js="true"] {
	display: none;
}

nav.open [data-js="true"] {
	display: block;
}

/* Hamburger button alleen zichtbaar met JS */
.nav-toggle {
	display: block;
}
</style>
