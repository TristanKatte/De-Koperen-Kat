<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let mobileOpen = false;
  let openIndex: number | null = null;
  let overlayEl: HTMLDivElement;

  const menuItems = [
    { title: 'Home', links: [{ label: 'Home', href: '/' }] },
    { title: 'De Brouwerij', links: [{ label: 'Over ons', href: '/about' }] },
    { title: 'De Bieren', links: [{ label: 'Alle Bieren', href: '/beers' }] },
    { title: 'Webshop', links: [
      { label: 'Cadeausets', href: '/webshop/cadeausets' },
      { label: 'Merchandise', href: '/webshop/merchandise' }
    ] },
    { title: 'Het Proeflokaal', links: [
      { label: 'Bezoeken', href: '/proeflokaal/bezoeken' },
      { label: 'Afhuren', href: '/proeflokaal/afhuren' },
      { label: 'Evenementen', href: '/proeflokaal/evenementen' }
    ] },
    { title: 'Nieuws', links: [{ label: 'Nieuws', href: '/nieuws' }] },
    { title: 'Agenda', links: [{ label: 'Agenda', href: '/agenda' }] },
    { title: 'Vacatures', links: [{ label: 'Vacatures', href: '/vacancies' }] },
    { title: 'Contact', links: [{ label: 'Contact', href: '/contact' }] }
  ];

  function toggleDropdown(i: number) {
    openIndex = openIndex === i ? null : i;
  }

  onMount(() => {
    if (overlayEl) {
      gsap.set(overlayEl, { y: '-100%' });
    }
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
          <a href={item.links[0].href} class="menu-link">{item.title}</a>
        {/if}
      </li>
    {/each}
  </ul>

  <button class="hamburger" on:click={openMenu} aria-label="Menu">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </button>
</nav>

<!-- MOBILE OVERLAY -->
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
/* --- GLOBAL --- */
nav ul, nav li { list-style: none; margin:0; padding:0; }

/* --- NAV --- */
nav.main-nav {
  background: var(--background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.logo img { height:3rem; }

/* --- DESKTOP MENU --- */
.desktop-menu {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.menu-item {
  position: relative;
}

.menu-button, .menu-link {
  background:none;
  border:none;
  color: var(--link-color);
  font-weight:600;
  cursor:pointer;
  font-size:1rem;
  padding:.5rem 1rem;
  display:block;
  width: max-content;
  text-align:left;
  transition: color .2s;
}

.menu-button:hover, .menu-link:hover { color: var(--highlight-color); }

.arrow { margin-left:.25rem; font-size:.9rem; }

/* --- DESKTOP DROPDOWN --- */
.dropdown {
  position: absolute;
  top: 100%;
  left:0;
  width:100%;
  box-sizing: border-box;
  background: var(--background-color);
  border:1px solid rgba(0,0,0,0.1);
  border-radius:0 0 .4rem .4rem;
  padding:.4rem 0;
  z-index:10;
  box-shadow:0 6px 12px rgba(0,0,0,0.08);
}

.dropdown li a {
  display:block;
  padding:0.4rem 1rem;
  color: var(--link-color);
  font-weight:600;
  text-decoration:none;
  white-space:nowrap;
}

.dropdown li a:hover { color: var(--highlight-color); }

/* --- HAMBURGER --- */
.hamburger {
  display:none;
  flex-direction:column;
  gap:5px;
  background:none;
  border:none;
  cursor:pointer;
}

.hamburger .bar { width:28px; height:3px; background: var(--link-color); }

/* --- MOBILE OVERLAY --- */
.mobile-overlay {
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background:var(--background-color);
  z-index:9999;
  padding:2rem;
  display:flex;
  flex-direction:column;
  list-style-type: none;
}

.mobile-overlay ul li {
  list-style-type: none;
}

.close-btn {
  align-self:flex-end;
  font-size:3rem;
  background:none;
  border:none;
  cursor:pointer;
  color: var(--link-color);
}

/* overlay menu */
.overlay-menu {
  margin-top:4rem;
  display:flex;
  flex-direction:column;
  gap:1.5rem;
}

.overlay-item {
  position: relative;
}

.overlay-button, .overlay-menu a {
  color: var(--link-color);
  font-size:2rem;
  font-weight:600;
  background:none;
  border:none;
  cursor:pointer;
  display:block;
  width:100%;
  text-align:left;
}

.overlay-dropdown {
  position:absolute;
  top:100%;
  left:0;
  display:flex;
  flex-direction:column;
  gap:.75rem;
  padding-left:1rem;
}

.overlay-dropdown li a {
  font-size:1.5rem;
  padding:.25rem 0;
}

.overlay-dropdown li a:hover { color: var(--highlight-color); }

/* --- RESPONSIVE --- */
@media(max-width:900px){
  .desktop-menu { display:none; }
  .hamburger { display:flex; }
}
</style>
