<script lang="ts">
  import { onMount } from 'svelte';
  import Polaroid from '$lib/components/molecules/Polaroid.svelte';
  
  let { title, content, photos, index = 0 } = $props();
  
  onMount(async () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(ScrollTrigger, SplitText);
    
    const section = document.querySelector(`[data-section="${index}"]`);
    const h2 = section?.querySelector('h2');
    const p = section?.querySelector('p');
    
    if (h2) {
      const splitH2 = new SplitText(h2, { type: 'chars, words' });
      gsap.from(splitH2.chars, {
        opacity: 0,
        y: 50,
        duration: 0.15,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: { trigger: h2, start: 'top 85%' }
      });
    }
    
    if (p) {
      const splitP = new SplitText(p, { type: 'chars, words' });
      gsap.from(splitP.chars, {
        opacity: 0,
        y: 25,
        duration: 0.15,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: { trigger: p, start: 'top 85%' }
      });
    }
    
    // Polaroid animations
    section?.querySelectorAll('.polaroid').forEach((card, i) => {
      const rotation = gsap.utils.random(-6, 6);
      gsap.from(card, {
        opacity: 0,
        y: 50,
        rotate: rotation,
        duration: 1,
        delay: i * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      });
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, rotate: rotation / 2, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, rotate: rotation, duration: 0.3, ease: 'power2.in' });
      });
    });
  });
</script>

<section 
  class="text-photo-container {index % 2 === 0 ? 'left' : 'right'}"
  data-section={index}
>
  <div class="text">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
  <div class="photo-grid">
    {#each photos as photo, j}
      <Polaroid 
        src={photo} 
        alt={`Foto ${j + 1} van ${title}`} 
        rotation={j % 2 === 0 ? -5 : 5} 
      />
    {/each}
  </div>
</section>

<style>
  .text-photo-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 900px;
    margin: 0 auto 8.5rem;
    container-type: inline-size;
    container-name: text-photo-section;
  }
  
  .text h2 {
    text-align: left;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .text p {
    color: var(--text-color, #1a1a1a);
    font-size: 1.15rem;
    line-height: 1.6;
  }
  
  .photo-grid {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  /* Container query for layout switch */
  @container text-photo-section (min-width: 64rem) {
    .text-photo-container.left {
      flex-direction: row;
      align-items: flex-start;
    }
    
    .text-photo-container.right {
      flex-direction: row-reverse;
      align-items: flex-start;
    }
    
    .text {
      flex: 1;
    }
    
    .photo-grid {
      flex: 1;
      justify-content: flex-start;
    }
  }
</style>