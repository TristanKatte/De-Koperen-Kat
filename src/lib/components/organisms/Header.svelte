<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { javascript } from '$lib/utils/javascriptEnabled.svelte.js';

  type MenuLink = { href: string; label: string };
  type MenuItem = { title: string; links: MenuLink[] };

  const menuItems: MenuItem[] = [
    { title: 'Home', links: [{ label: 'Home', href: '/' }] },
    { title: 'De Brouwerij', links: [{ label: 'Over ons', href: '/about' }] },
    { title: 'De Bieren', links: [{ label: 'Alle Bieren', href: '/beers' }] },
    { title: 'Webshop', links: [{ label: 'Webshop', href: '/webshop' }] },
    { title: 'Het Proeflokaal', links: [{ label: 'Proeflokaal', href: '/tasting-room' }] },
    { title: 'Nieuws', links: [{ label: 'Nieuws', href: '/news' }] },
    { title: 'Agenda', links: [{ label: 'Agenda', href: '/agenda' }] },
    { title: 'Vacatures', links: [{ label: 'Vacatures', href: '/vacancies' }] },
    { title: 'Contact', links: [{ label: 'Contact', href: '/contact' }] }
  ];

  let mobileOpen = $state(false);
  let openIndex: number | null = $state(null);
  let overlayEl: HTMLElement;

  function toggleDropdown(i: number) {
    openIndex = openIndex === i ? null : i;
  }

  onMount(() => {
    if (overlayEl) gsap.set(overlayEl, { y: '-100%' });
  });

  function openMenu() {
    mobileOpen = true;

    requestAnimationFrame(() => {
      gsap.to(overlayEl, {
        y: '0%',
        duration: 0.6,
        ease: 'power4.out'
      });
    });
  }

  function closeMenu() {
    gsap.to(overlayEl, {
      y: '-100%',
      duration: 0.6,
      ease: 'power4.in',
      onComplete: () => {
        mobileOpen = false;
        openIndex = null;
      }
    });
  }
</script>

<nav
  class="main-nav"
  class:js-enabled={javascript.enabled}
  aria-label="Hoofdmenu"
>

  <a href="/" class="logo">
    <img src="/images/dkk-logo-cropped.png" alt="Brouwerij De Koperen Kat Logo" />
  </a>

  <!-- DESKTOP -->
  <ul class="desktop-menu">
    {#each menuItems as item, i}
      <li class="menu-item">
        {#if item.links.length > 1}
          <button
            class="menu-button"
            aria-expanded={openIndex === i}
            aria-haspopup="true"
            aria-controls={"desktop-dd-" + i}
            onclick={() => toggleDropdown(i)}
          >
            {item.title}
            <span class="arrow">▾</span>
          </button>

          {#if openIndex === i}
            <ul class="dropdown" id={"desktop-dd-" + i}>
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

  <!-- MOBILE HAMBURGER -->
  <button class="hamburger" onclick={openMenu} aria-label="Open navigatie">
    <span></span><span></span><span></span>
  </button>

  <!-- MOBILE OVERLAY -->
  <div
    bind:this={overlayEl}
    class="mobile-overlay"
    aria-hidden={!mobileOpen}
  >
    <button class="close-btn" onclick={closeMenu} aria-label="Sluit menu">×</button>

    <ul class="overlay-menu">
      {#each menuItems as item, i}
        <li class="overlay-item">
          {#if item.links.length > 1}
            <button
              class="overlay-button"
              aria-expanded={openIndex === i}
              aria-haspopup="true"
              aria-controls={"mobile-dd-" + i}
              onclick={() => toggleDropdown(i)}
            >
              {item.title} <span class="arrow">▾</span>
            </button>

            {#if openIndex === i}
              <ul class="overlay-dropdown" id={"mobile-dd-" + i}>
                {#each item.links as link}
                  <li><a href={link.href} onclick={closeMenu}>{link.label}</a></li>
                {/each}
              </ul>
            {/if}
          {:else}
            <a href={item.links[0].href} onclick={closeMenu}>{item.title}</a>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
/* RESET */
ul, li { margin: 0; padding: 0; list-style: none; }

/* NAV WRAPPER */
nav.main-nav {
  background: #f5f5f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo img { height: 3rem; }

/* DESKTOP MENU */
.desktop-menu {
  display: flex;
  gap: 2rem;
}

.menu-item { position: relative; }

.menu-button,
.menu-link {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: var(--text-color);
}

.menu-button:hover,
.menu-link:hover {
  color: var(--highlight-color);
}

/* DROPDOWN */
.dropdown {
  position: absolute;
  left: 0;
  top: 100%;
  background: var(--background-color);
  border-radius: 0 0 .4rem .4rem;
  padding: 0.5rem 0;
  box-shadow: 0 6px 12px rgba(0,0,0,.1);
  z-index: 20;
}

/* HAMBURGER */
.hamburger {
  display: none;
  flex-direction: column;
  gap: .4rem;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  width: 28px;
  height: 3px;
  background: var(--text-color);
}

/* MOBILE OVERLAY */
.mobile-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  flex-direction: column;
  padding: 2rem;
  background: var(--background-color);
  z-index: 200;
  display: block;
  transform: translateY(-100%);
}

.js-enabled .mobile-overlay {
  display: flex;
}

.close-btn {
  align-self: flex-end;
  font-size: 3rem;
  background: none;
  border: none;
  cursor: pointer;
}

.overlay-menu {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.overlay-button,
.overlay-item a {
  font-size: 2rem;
  font-weight: 700;
  background: none;
  border: none;
  text-align: left;
  color: var(--text-color);
}

.overlay-item a:hover {
  color: var(--highlight-color);
  text-decoration: underline;
}

.overlay-dropdown {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: .75rem;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .desktop-menu { display: none; }
  .hamburger { display: flex; }
}
</style>
