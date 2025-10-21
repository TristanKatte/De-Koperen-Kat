<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  let heroSection: HTMLElement | null = null;
  let heroImage: HTMLElement | null = null;

  onMount(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // ✅ Fade-in animatie bij eerste zicht
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } });
            tl.from(".hero__title", { y: 40, opacity: 0 })
              .from(".hero__subtitle", { y: 20, opacity: 0 }, "-=0.4")
              .from(".hero__actions a", { opacity: 0, y: 10, stagger: 0.1 }, "-=0.2");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroSection) observer.observe(heroSection);

    // ✅ Parallax-effect op de hero afbeelding
    if (heroImage) {
      gsap.to(heroImage, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });
</script>

<section bind:this={heroSection} class="hero" aria-labelledby="hero-title">
  <div class="hero__content">
    <h1 id="hero-title" class="hero__title">
      Ontdek onze ambachtelijke bieren
    </h1>

    <p class="hero__subtitle">
      Geniet van authentieke smaken, gebrouwen met passie — rechtstreeks uit onze brouwerij.
    </p>

    <div class="hero__actions">
      <a href="/bieren" class="btn btn--primary">Bekijk onze bieren</a>
      <a href="/proeflokaal" class="btn btn--secondary">Bezoek het proeflokaal</a>
    </div>
  </div>

  <figure class="hero__media" bind:this={heroImage}>
    <img
      src="/images/brewery-hero.jpg"
      alt="Ambachtelijke brouwer brouwt bier in koperen ketel"
      width="1200"
      height="700"
      decoding="async"
      loading="lazy"
    />
  </figure>
</section>

<style>
  /* 🧩 Layout */
  .hero {
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 2rem;
    padding: 4rem 1.5rem;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  @media (min-width: 50rem) {
    .hero {
      grid-template-columns: 1fr 1fr;
      text-align: left;
      padding: 6rem 3rem;
      min-height: 80vh;
    }
  }

  /* 🖋️ Typografie */
  .hero__title {
    font-family: var(--font-family-headings, "Noticia Text", serif);
    font-size: clamp(2rem, 4vw + 1rem, 3.5rem);
    color: var(--text-color, #3c4858);
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero__subtitle {
    font-family: var(--font-family-body, "Ubuntu", sans-serif);
    font-size: 1.2rem;
    color: var(--link-color, #555);
    margin-bottom: 2.5rem;
    max-width: 45ch;
  }

  /* 🧭 Buttons */
  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  @media (min-width: 50rem) {
    .hero__actions {
      justify-content: flex-start;
      gap: 1.5rem;
    }
  }

  .btn {
    display: inline-block;
    padding: 0.85rem 1.8rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.25s ease, transform 0.25s ease;
  }

  .btn--primary {
    background-color: var(--cta-buttons, #ed651c);
    color: #fff;
  }

  .btn--primary:hover,
  .btn--primary:focus-visible {
    background-color: #c74d0d;
    transform: scale(1.05);
  }

  .btn--secondary {
    background-color: transparent;
    border: 2px solid var(--cta-buttons, #ed651c);
    color: var(--cta-buttons, #ed651c);
  }

  .btn--secondary:hover,
  .btn--secondary:focus-visible {
    background-color: var(--cta-buttons, #ed651c);
    color: #fff;
  }

  /* 🖼️ Media */
  .hero__media {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  .hero__media img {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
    object-fit: cover;
    display: block;
    will-change: transform;
  }

  /* 🌗 Accessibility / prefers reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition: none;
    }
  }
</style>
