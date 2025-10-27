<script lang="ts">
	const menuItems = [
		{
			title: 'De Brouwerij & Huurbrouwen',
			links: [
				{ label: 'Over ons', href: '/about' },
				{ label: 'Huurbrouwen', href: '/huurbrouwen' }
			]
		},
		{
			title: 'De Bieren',
			links: [
				{ label: 'Alle Bieren', href: '/bieren' },
				{ label: 'Seizoensbieren', href: '/bieren/seizoensbieren' }
			]
		},
		{
			title: 'Webshop',
			links: [
				{ label: 'Cadeausets', href: '/webshop/cadeausets' },
				{ label: 'Merchandise', href: '/webshop/merchandise' }
			]
		},
		{
			title: 'Het Proeflokaal',
			links: [
				{ label: 'Bezoeken', href: '/proeflokaal/bezoeken' },
				{ label: 'Afhuren', href: '/proeflokaal/afhuren' },
				{ label: 'Evenementen', href: '/proeflokaal/evenementen' }
			]
		},
		{ title: 'Nieuws', links: [{ label: 'Nieuws', href: '/nieuws' }] },
		{ title: 'Agenda', links: [{ label: 'Agenda', href: '/agenda' }] },
		{ title: 'Partners', links: [{ label: 'Partners', href: '/partners' }] },
		{ title: 'Contact', links: [{ label: 'Contact', href: '/contact' }] }
	];

	let openIndex: number | null = null;

	function toggleDropdown(index: number) {
		openIndex = openIndex === index ? null : index;
	}

	function closeDropdown() {
		openIndex = null;
	}
</script>

<nav class="main-nav" on:mouseleave={closeDropdown}>
	<!-- Logo -->
	<a href="/" class="logo">
		<img src="/images/dkk-logo-cropped.png" alt="Brouwerij Logo" />
	</a>

	<ul class="menu">
		{#each menuItems as item, i}
			<li class="menu-item">
				{#if item.links.length > 1}
					<button class="menu-button" on:click={() => toggleDropdown(i)}>
						{item.title}
						<span class="arrow">▾</span>
					</button>

					{#if openIndex === i}
						<ul class="dropdown">
							{#each item.links as link}
								<li><a href={link.href} class="menu-link">{link.label}</a></li>
							{/each}
						</ul>
					{/if}
				{:else}
					<a href={item.links[0].href} class="menu-link">{item.title}</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav.main-nav {
		background: var(--background-color);
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 1rem 2rem;
		gap: 2rem;
		position: sticky;
		top: 0;
		z-index: 9999;
	}

	.logo img {
		height: 3rem;
		width: auto;
		display: block;
	}

	ul.menu {
		display: flex;
		gap: 2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.menu-item {
		position: relative;
	}

	/* Consistente hoofdlinks en dropdownlinks */
	.menu-button,
	.menu-link {
		background: none;
		border: none;
		color: var(--link-color);
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		font-family: inherit;
		font-size: 1rem;
		padding: 0.5rem 0.75rem;
		line-height: 1.4;
		white-space: nowrap;
		transition: color 0.2s ease;
	}

	.menu-button:hover,
	.menu-link:hover {
		color: var(--highlight-color);
	}

	.arrow {
		font-size: 0.95rem;
		margin-left: 0.25rem;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 50%;
		right: 50%;
		transform: translateX(-50%);
		background: var(--background-color);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 0 0 0.4rem 0.4rem;
		margin-top: 0.2rem;
		z-index: 10;
		min-width: max-content; /* past zich aan aan de inhoud */
		text-align: center;
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
		list-style-type: none;
	}

	.dropdown li {
		text-align: center;
	}

	.dropdown li a {
		margin: 0 auto;
	}

	.dropdown .menu-link {
		display: block;
		width: 100%;
		color: var(--link-color);
		text-decoration: none;
		font-weight: 600;
		padding: 0.5rem 0.75rem;
		text-align: center;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.dropdown .menu-link:hover {
		color: var(--highlight-color);
	}
</style>
