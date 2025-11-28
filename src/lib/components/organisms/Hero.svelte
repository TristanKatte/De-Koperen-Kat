<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let heroSection: HTMLElement | null = $state(null);

  onMount(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const titleEl = heroSection?.querySelector(".hero-title");
    const subtitleEl = heroSection?.querySelector(".hero-subtitle");
    const buttons = gsap.utils.toArray(".hero-actions a");

    if (titleEl && subtitleEl) {
      const splitTitle = new SplitText(titleEl, { type: "chars", charsClass: "char", });
      const splitSubtitle = new SplitText(subtitleEl, { type: "words", wordsClass: "word", });

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

<section bind:this={heroSection} class="hero">
  <div class="hero-content">
    <img src="/images/dkk-logo.png" alt="Logo Stadsbrouwerij De Koperen Kat" class="logo" />
    <h1 id="hero-title" class="hero-title">
      Welkom bij Stadsbrouwerij<br /> De Koperen Kat
    </h1>
    <p class="hero-subtitle">
      De oudste stadsbrouwerij van Delft
    </p>
    <div class="hero-actions">
      <a href="/beers" class="btn btn--primary">Bekijk onze bieren</a>
      <a href="/tasting-room" class="btn btn--secondary">Bezoek het proeflokaal</a>
    </div>
  </div>

  <div class="hero-image">
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
.hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  color: #fff;
  overflow: hidden;
  text-align: center;
}

/* ===== Achtergrondafbeelding ===== */
.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  z-index: 0;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Overlaykleur */
.hero-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1;
}

/* ===== Tekst & content ===== */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 70rem;
  padding: 4rem 2rem;
  display: grid;
  gap: 2rem;
  justify-items: center;
  text-align: center;
}

.hero-title {
  font-family: "Noticia Text", serif;
  font-size: clamp(2rem, 4vw + 1rem, 4.5rem);
  line-height: 1.1;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.hero-subtitle {
  font-family: "Ubuntu", sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  line-height: 1.5;
  margin: 0;
  color: #f2f2f2;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
}

/* ===== Knoppen ===== */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
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
  background-color: #ed651c;
  color: #fff;
}

.btn--primary:hover {
  background-color: var(--cta-hover);
  transform: scale(1.05);
}

.btn--secondary {
  border: 2px solid #ed651c;
  color: #f5f5f0;
  background: transparent;
}

.btn--secondary:hover {
  background-color: var(--cta-hover);
  color: #fff;
}

/* ===== Responsiviteit ===== */
@media (min-width: 50rem) {
  .hero-content {
    padding: 6rem 5rem;
  }

  .hero-title {
    font-size: clamp(2.5rem, 3vw + 1rem, 5rem);
  }
}

/* ===== SplitText chars ===== */
:global(.char) {
  display: inline-block;
  white-space: pre;
}
</style>
