<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  /* ----------------- TYPES ----------------- */
  type MenuLink = {
    href: string;
    label: string;
  };

  type MenuItem = {
    title: string;
    links: MenuLink[];
  };

  /* ----------------- DATA ----------------- */
const menuItems: MenuItem[] = [
  { title: 'Home', links: [{ label: 'Home', href: '/' }] },
  { title: 'De Brouwerij', links: [{ label: 'Over ons', href: '/about' }] },
  { title: 'De Bieren', links: [{ label: 'Alle Bieren', href: '/beers' }] },

  // --- GEWIJZIGD ---
  { title: 'Webshop', links: [{ label: 'Webshop', href: '/webshop' }] },

  // --- GEWIJZIGD ---
  { title: 'Het Proeflokaal', links: [{ label: 'Proeflokaal', href: '/tasting-room' }] },

  { title: 'Nieuws', links: [{ label: 'Nieuws', href: '/news' }] },
  { title: 'Agenda', links: [{ label: 'Agenda', href: '/agenda' }] },
  { title: 'Vacatures', links: [{ label: 'Vacatures', href: '/vacancies' }] },
  { title: 'Contact', links: [{ label: 'Contact', href: '/contact' }] }
];

  /* ----------------- STATE ----------------- */
  let mobileOpen = false;
  let openIndex: number | null = null;
  let overlayEl: HTMLDivElement;

  function toggleDropdown(i: number) {
    openIndex = openIndex === i ? null : i;
  }

  /* ----------------- JS ENHANCEMENT ----------------- */
  onMount(() => {
    document.documentElement.classList.add('js');

    if (overlayEl) {
      gsap.set(overlayEl, { y: '-100%' });
    }
  });

  /* ----------------- MOBILE MENU ----------------- */
  function openMenu() {
    mobileOpen = true;

    requestAnimationFrame(() => {
      gsap.to(overlayEl, {
        y: '0%',
        duration: 0.7,
        ease: 'power4.out'
      });
    });
  }

  function closeMenu() {
    gsap.to(overlayEl, {
      y: '-100%',
      duration: 0.7,
      ease: 'power4.in',
      onComplete: () => {
        mobileOpen = false;
      }
    });
  }
</script>

<nav class="main-nav">
  <a href="/" class="logo">
    <img src="/images/dkk-logo-cropped.png" alt="Brouwerij Logo" />
  </a>

  <!-- DESKTOP MENU -->
  <ul class="menu desktop-menu">
    {#each menuItems as item, i}
      <li class="menu-item">
        {#if item.links.length > 1}
          <button
            class="menu-button"
            aria-expanded={openIndex === i}
            on:click={() => toggleDropdown(i)}
          >
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
          <a href={item.links[0].href} class="menu-link">{item.title}</a>
        {/if}
      </li>
    {/each}
  </ul>

  <!-- HAMBURGER -->
  <button class="hamburger" on:click={openMenu} aria-label="Menu">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </button>
</nav>

<!-- MOBILE OVERLAY (hidden by default without JS) -->
<div
  bind:this={overlayEl}
  class="mobile-overlay"
  aria-hidden={!mobileOpen}
>
  <button class="close-btn" on:click={closeMenu}>×</button>

  <ul class="overlay-menu">
    {#each menuItems as item, i}
      <li class="overlay-item">
        {#if item.links.length > 1}
          <button
            class="overlay-button"
            aria-expanded={openIndex === i}
            on:click={() => toggleDropdown(i)}
          >
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
/* RESET */
nav ul,
nav li {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* NAV */
nav.main-nav {
  background: #f5f5f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.logo img {
  height: 3rem;
}

/* DESKTOP MENU */
.desktop-menu {
  display: flex;
  gap: 2rem;
}

.menu-item {
  position: relative;
}

.menu-button,
.menu-link {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: var(--link-color);
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color 0.2s;
}

.menu-button:hover,
.menu-link:hover {
  color: var(--highlight-color);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--background-color);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 0.4rem 0.4rem;
  padding: 0.4rem 0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  z-index: 20;
}

.dropdown li a {
  display: block;
  padding: 0.4rem 1rem;
  color: var(--link-color);
  font-weight: 600;
}

.dropdown li a:hover {
  color: var(--highlight-color);
}

/* HAMBURGER */
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

/* MOBILE OVERLAY */
/* Hidden by default until JS activates it */
.mobile-overlay {
  display: none; /* PE fix */
}

.close-btn {
  align-self: flex-end;
  font-size: 3rem;
  background: none;
  border: none;
  color: var(--link-color);
  cursor: pointer;
}

.overlay-menu {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.overlay-button,
.overlay-menu a {
  font-size: 2rem;
  font-weight: 600;
  background: none;
  border: none;
  color: var(--link-color);
  text-align: left;
  cursor: pointer;
}

.overlay-dropdown {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.overlay-dropdown li a {
  font-size: 1.5rem;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .desktop-menu {
    display: none;
  }
  .hamburger {
    display: flex;
  }
}
</style>
