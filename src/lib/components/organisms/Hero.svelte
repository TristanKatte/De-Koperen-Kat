<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let heroSection: HTMLElement | null = null;

  onMount(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const titleEl = heroSection?.querySelector(".hero__title");
    const subtitleEl = heroSection?.querySelector(".hero__subtitle");
    const buttons = gsap.utils.toArray(".hero__actions a");

    if (titleEl && subtitleEl) {
      const splitTitle = new SplitText(titleEl, { type: "chars" });
      const splitSubtitle = new SplitText(subtitleEl, { type: "words" });

      // Schuimende animatie
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top 85%",
        },
      });

      tl.from(splitTitle.chars, {
        opacity: 0,
        y: 60,
        scale: 0,
        stagger: 0.05,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
      })
        .from(
          splitSubtitle.words,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
            stagger: 0.07,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(buttons, { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "-=0.4");
    }
  });
</script>

<section bind:this={heroSection} class="hero" aria-labelledby="hero-title">
  <div class="hero__content">
    <h1 id="hero-title" class="hero__title">
      Welkom bij stadsbrouwerij De Koperen Kat
    </h1>
    <p class="hero__subtitle">
      De oudste stadsbrouwerij van Delft
    </p>
    <div class="hero__actions">
      <a href="/beers" class="btn btn--primary">Bekijk onze bieren</a>
      <a href="/proeflokaal" class="btn btn--secondary">Bezoek het proeflokaal</a>
    </div>
  </div>

  <div class="hero__image-wrapper">
    <img
      src="/images/brewery-hero.jpg"
      alt="Ambachtelijke brouwer brouwt bier in koperen ketel"
      width="1200"
      height="700"
      decoding="async"
      loading="lazy"
    />
  </div>
</section>

<style>
  /* ===== Layout ===== */
  .hero {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #3c2f2f;
    color: #fff;
    overflow: hidden;
  }

  @media (min-width: 50rem) {
    .hero {
      flex-direction: row;
    }
  }

  /* ===== Tekstgedeelte ===== */
  .hero__content {
    flex: 1.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 2rem;
    text-align: center;
    z-index: 2;
  }

  @media (min-width: 50rem) {
    .hero__content {
      text-align: left;
      padding: 6rem 5rem;
    }
  }

  .hero__title {
    font-size: clamp(2.5rem, 4vw + 1rem, 7rem);
    font-family: "Noticia Text", serif;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    color: #f3f3f3;
    max-width: 22ch;
    text-align: center;
  }

  .hero__subtitle {
    font-family: "Ubuntu", sans-serif;
    font-size: 1.25rem;
    max-width: 40ch;
    color: #f3f3f3;
    margin-bottom: 2.5rem;
  }

  /* ===== Buttons ===== */
  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    justify-content: center;
  }

  @media (min-width: 50rem) {
    .hero__actions {
      justify-content: flex-start;
    }
  }

  .btn {
    display: inline-block;
    padding: 0.9rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.25s ease, transform 0.25s ease;
  }

  .btn--primary {
    background-color: var(--cta-buttons, #ed651c);
    color: #fff;
  }

  .btn--primary:hover {
    background-color: #c74d0d;
    transform: scale(1.05);
  }

  .btn--secondary {
    border: 2px solid var(--cta-buttons, #ed651c);
    color: var(--cta-buttons, #ed651c);
    background: transparent;
  }

  .btn--secondary:hover {
    background-color: var(--cta-buttons, #ed651c);
    color: #fff;
  }

  .hero__image-wrapper {
    flex: 1;
    position: relative;
    width: 100%;
    height: 50vh;
    overflow: hidden;
  }

  @media (min-width: 50rem) {
    .hero__image-wrapper {
      height: 100vh;
    }
  }

  .hero__image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .hero__image-wrapper::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(60, 47, 47, 0.65), rgba(60, 47, 47, 0.2));
  }

  :global(.char) {
    display: inline-block;
    white-space: pre;
  }
</style>