<script lang="ts">
  import { onMount } from 'svelte';
  
  let { value, label } = $props();
  let counterElement: HTMLElement;
  let wrapperElement: HTMLElement;
  
  onMount(async () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    
    const raw = value.toString().replace(/\D/g, '');
    const target = raw ? parseInt(raw, 10) : 0;
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: target,
      duration: 0.25,
      ease: 'power3.out',
      scrollTrigger: { trigger: wrapperElement, start: 'top 90%', once: true },
      onUpdate: () => {
        if (counterElement) {
          counterElement.textContent =
            target < 10000
              ? Math.round(obj.val).toString()
              : Math.round(obj.val).toLocaleString();
        }
      }
    });
    
    gsap.from(wrapperElement, {
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      ease: 'power2.out',
      scrollTrigger: { trigger: wrapperElement, start: 'top 90%', once: true }
    });
  });
</script>

<div class="counter-wrapper" bind:this={wrapperElement}>
  <span bind:this={counterElement}>{value}</span>
  <p>{label}</p>
</div>

<style>
  .counter-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #c27c3a;
    color: #1a1a1a;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    min-height: 100px;
    width: 100%;
  }
  
  span {
    font-size: 2rem;
    font-weight: 700;
  }
  
  p {
    font-size: 0.95rem;
    margin-top: 0.5rem;
  }
</style>