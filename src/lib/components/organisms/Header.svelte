<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let mobileOpen = false;
  let openIndex: number | null = null;
  let overlayEl: HTMLDivElement;

  const menuItems = [
	{
	  title: 'Home',
      links: [{ label: 'Home', href: '/' }]
	},
    {
      title: 'De Brouwerij',
      links: [{ label: 'Over ons', href: '/about' }]
    },
    {
      title: 'De Bieren',
      links: [{ label: 'Alle Bieren', href: '/beers' }]
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
    { title: 'Vacatures', links: [{ label: 'Vacatures', href: '/vacancies' }] },
    { title: 'Contact', links: [{ label: 'Contact', href: '/contact' }] }
  ];

  function toggleDropdown(i: number) {
    openIndex = openIndex === i ? null : i;
  }

  onMount(() => {
    gsap.set(overlayEl, { y: '-100%' });
  });

  function openMenu() {
    mobileOpen = true;
    gsap.to(overlayEl, {
      y: '0%',
      duration: 0.7,
      ease: 'power4.out'
    });
  }

  function closeMenu() {
    gsap.to(overlayEl, {
      y: '-100%',
      duration: 0.7,
      ease: 'power4.in',
      onComplete: () => (mobileOpen = false)
    });
  }
</script>

<nav class="main-nav">
  <a href="/" class="logo">
    <img src="/images/dkk-logo-cropped.png" alt="Brouwerij Logo" />
  </a>

  <button class="hamburger" on:click={openMenu} aria-label="Menu">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </button>

  <ul class="menu desktop-menu">
    {#each menuItems as item, i}
      <li class="menu-item">
        {#if item.links.length > 1}
          <button class="menu-button" on:click={() => toggleDropdown(i)}>
            {item.title}<span class="arrow">▾</span>
          </button>

          {#if openIndex === i}
            <ul class="dropdown">
              {#each item.links as link}
                <li><a href={link.href} class="menu-link">{link.label}</a></li>
              {/each}
            </ul>
          {/if}
        {:else}
          <a class="menu-link" href={item.links[0].href}>{item.title}</a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<!-- FULLSCREEN OVERLAY -->
<div bind:this={overlayEl} class="mobile-overlay">
  <button class="close-btn" on:click={closeMenu}>×</button>

  <ul class="overlay-menu">
    {#each menuItems as item, i}
      <li class="overlay-item">
        {#if item.links.length > 1}
          <button class="overlay-button" on:click={() => toggleDropdown(i)}>
            {item.title}<span class="arrow">▾</span>
          </button>

          {#if openIndex === i}
            <ul class="overlay-dropdown">
              {#each item.links as link}
                <li><a href={link.href} on:click={closeMenu}>{link.label}</a></li>
              {/each}
            </ul>
          {/if}
        {:else}
          <a href={item.links[0].href} on:click={closeMenu}>{item.title}</a>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  nav ul, nav li { list-style-type: none; }
  nav.main-nav {
    background: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .logo img {
    height: 3rem;
  }

  .desktop-menu {
    display: flex;
    gap: 2rem;
  }

  .menu-button,
  .menu-link {
    background: none;
    border: none;
    color: var(--link-color);
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;
    padding: .5rem .75rem;
    transition: color .2s;
  }

  .menu-button:hover,
  .menu-link:hover {
    color: var(--highlight-color);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--background-color);
    border: 1px solid rgba(0,0,0,0.1);
    padding: .4rem 0;
    border-radius: .4rem;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .hamburger .bar {
    width: 28px;
    height: 3px;
    background: var(--link-color);
  }

  /* FULLSCREEN OVERLAY */
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--background-color);
    z-index: 9999;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    opacity: 1;
  }

  .close-btn {
    align-self: flex-end;
    font-size: 3rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--link-color);
  }

  .overlay-menu {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    list-style-type: none;
  }

  .overlay-button,
  .overlay-menu a {
    color: var(--link-color);
    font-size: 2rem;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
  }

  .overlay-dropdown {
    padding-left: 1rem;
    margin-top: .5rem;
    display: flex;
    flex-direction: column;
    gap: .75rem;
  }

  @media(max-width: 900px) {
    .desktop-menu { display:none; }
    .hamburger { display:flex; }
  }
</style>
