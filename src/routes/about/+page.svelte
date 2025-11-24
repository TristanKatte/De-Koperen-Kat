<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { SplitText } from 'gsap/SplitText';
  import { aboutContent } from '$lib/content/about';
  import Polaroid from '$lib/components/molecules/Polaroid.svelte';
  import Modal from '$lib/components/molecules/Modal.svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Modal state
  let selectedHuur: typeof aboutContent.huurbrouwen[0] | null = null;
  let isModalOpen = false;

  const openModal = (huur: typeof aboutContent.huurbrouwen[0]) => {
    selectedHuur = huur;
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
    selectedHuur = null;
  };

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Animatie per sectie (h2 + p)
    document.querySelectorAll('.text-photo-container').forEach(section => {
      const h2 = section.querySelector('h2');
      const p = section.querySelector('p');

      if (h2) {
        const splitH2 = new SplitText(h2, { type: 'chars, words' });
        gsap.from(splitH2.chars, {
          opacity: 0,
          y: 50,
          duration: 0.8,
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
          duration: 0.8,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 85%' }
        });
      }
    });

    // Polaroid animaties
    document.querySelectorAll('.photo-grid .polaroid').forEach((card, i) => {
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

    // Counters animatie + fade/scale
    document.querySelectorAll<HTMLElement>('.counter-wrapper').forEach(wrapper => {
      const counter = wrapper.querySelector('span')!;
      const raw = counter.textContent!.replace(/\D/g, '');
      const target = raw ? parseInt(raw, 10) : 0;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrapper, start: 'top 90%', once: true },
        onUpdate: () => {
          counter.textContent = target >= 1000
            ? Math.round(obj.val).toLocaleString()
            : Math.round(obj.val).toString();
        }
      });

      gsap.from(wrapper, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapper, start: 'top 90%', once: true }
      });
    });
  });
</script>

<main class="about-section">
  <header class="about-header">
    <h1>{aboutContent.intro}</h1>
  </header>

  {#each aboutContent.sections as section, i}
    <section class="text-photo-container {i % 2 === 0 ? 'left' : 'right'}">
      <div class="text">
        <h2>{section.title}</h2>
        <p>{section.content}</p>
      </div>
      <div class="photo-grid">
        {#each section.photos as photo, j}
          <Polaroid src={photo} alt={`Foto ${j + 1} van ${section.title}`} rotation={j % 2 === 0 ? -5 : 5} />
        {/each}
      </div>
    </section>
  {/each}

  <!-- Counters -->
  <section class="counters" aria-label="Statistieken">
    <div class="counters-grid">
      {#each aboutContent.counters as counter}
        <div class="counter-wrapper">
          <span>{counter.value}</span>
          <p>{counter.label}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Partners -->
  <section class="partners" aria-labelledby="partners-title">
    <h2 id="partners-title">Onze partners 🤝</h2>
    <div class="partners-grid">
      {#each aboutContent.partners as partner}
        <article class="partner-card">
          <img src={partner.logo} alt={partner.name} />
          <p>{partner.name}</p>
          <a href={partner.url} target="_blank" rel="noopener noreferrer">Meer info</a>
        </article>
      {/each}
    </div>
  </section>

  <!-- Huurbrouwen -->
  <section class="huurbrouwen" aria-labelledby="huurbrouwen-title">
    <h2 id="huurbrouwen-title">Huurbrouwen 🍻</h2>
    <div class="huurbrouwen-grid">
      {#each aboutContent.huurbrouwen as huur}
        <button
          type="button"
          class="huur-card"
          on:click={() => openModal(huur)}
        >
          <h3>{huur.name}</h3>
          <p>{huur.description}</p>
        </button>
      {/each}
    </div>
  </section>

  <!-- Modal -->
  <Modal
    open={isModalOpen}
    title={selectedHuur?.name ?? ''}
    content={selectedHuur?.description ?? ''}
    on:close={closeModal}
  />
</main>

<style>
  .about-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1.5rem;
    background-color: var(--accent-light, #ffe6b3);
  }

  .about-header h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--accent-dark, #4b2e05);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    max-width: 900px;
  }

  .text-photo-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 900px;
    margin-bottom: 5rem;
    min-height: 100dvh;
    justify-content: center;
  }

  .text-photo-container.left, .text-photo-container.right {
    flex-direction: column;
  }

  .text-photo-container .text h2 {
    text-align: left;
  }

  .photo-grid {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .text-photo-container.left {
      flex-direction: row;
      align-items: flex-start;
    }
    .text-photo-container.right {
      flex-direction: row-reverse;
      align-items: flex-start;
    }
    .photo-grid {
      justify-content: flex-start;
    }
  }

  .counters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    justify-items: center;
    max-width: 900px;
  }

  .counter-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #c27c3a;
    color: #fff;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    min-height: 100px;
    width: 100%;
  }

  .counter-wrapper span {
    font-size: 2rem;
    font-weight: 700;
  }

  .partners-grid,
  .huurbrouwen-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    justify-items: center;
    width: 100%;
    max-width: 900px;
  }

  .partner-card {
    text-align: center;
    background: #fff;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .partner-card img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto 0.5rem;
    background-color: #fff;
  }

  .huur-card {
    background: #fff;
    padding: 1rem;
    border-radius: 1rem;
    text-align: left;
    cursor: pointer;
    width: 100%;
  }

  @media (max-width: 768px) {
    .counters-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
