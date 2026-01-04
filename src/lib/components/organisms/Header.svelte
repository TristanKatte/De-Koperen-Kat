<script lang="ts">
	import Nav from '$lib/components/molecules/Nav.svelte';

	const menuItems = [
		{ title: 'Home', links: [{ label: 'Home', href: '/' }] },
		{ title: 'De Brouwerij', links: [{ label: 'Over ons', href: '/de-brouwerij' }] },
		{ title: 'De Bieren', links: [{ label: 'Alle Bieren', href: '/bieren' }] },
		{ title: 'Webshop', links: [{ label: 'Webshop', href: '/webshop' }] },
		{ title: 'Het Proeflokaal', links: [{ label: 'Proeflokaal', href: '/proeflokaal' }] },
		{ title: 'Nieuws', links: [{ label: 'Nieuws', href: '/nieuws' }] },
		{ title: 'Agenda', links: [{ label: 'Agenda', href: '/agenda' }] },
		{ title: 'Vacatures', links: [{ label: 'Vacatures', href: '/vacatures' }] },
		{ title: 'Contact', links: [{ label: 'Contact', href: '/contact' }] }
	];
</script>

<header class="site-header">
	<a href="/" class="logo">
		<img src="/images/dkk-logo-cropped.png" alt="Brouwerij De Koperen Kat Logo" />
	</a>

	<Nav {menuItems} />
</header>

<style>
	.site-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: #f5f5f0;
		position: sticky;
		top: 0;
		z-index: 100;
		gap: 2rem;
	}

	.logo img {
		height: 3rem;
	}
</style>
