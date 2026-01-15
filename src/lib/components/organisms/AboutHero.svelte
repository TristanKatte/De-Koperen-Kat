<script lang="ts">
  import { onMount } from 'svelte';
  
  let { intro } = $props();
  
  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const { gsap } = await import('gsap');
    const { SplitText } = await import('gsap/SplitText');
    
    const h1 = document.querySelector('.about-header h1');
    if (h1) {
      const split = new SplitText(h1, { type: 'chars, words' });
      gsap.from(split.chars, {
        opacity: 0,
        y: 50,
        duration: 0.15,
        stagger: 0.03,
        ease: 'power2.out'
      });
    }
  });
</script>

<header class="about-header">
  <h1>{intro}</h1>
</header>

<style>
  .about-header {
    width: 100%;
    text-align: center;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.5rem;
    color: var(--text-color);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    max-width: 900px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 3rem;
    }
  }
</style>