<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  export let showDescription: boolean = true;

  const dispatch = createEventDispatcher();

  let name = '';
  let email = '';
  let date = '';
  let guests: number | null = null;
  let success = false;
  let error: string | null = null;

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    error = null;
    success = false;

    if (!name || !email || !date || !guests) {
      error = 'Vul alle velden in.';
      return;
    }

    const { error: insertError } = await supabase
      .from('bookings')
      .insert([{ name, email, date, guests }]);

    if (insertError) {
      error = 'Er ging iets mis bij het reserveren. Probeer later opnieuw.';
      console.error(insertError);
      return;
    }

    success = true;
    name = '';
    email = '';
    date = '';
    guests = null;

    dispatch('success');
  };

  onMount(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.utils
      .toArray<HTMLElement>('.tasting-form .form-group, .tasting-form button')
      .forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          y: 15,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.07,
          ease: 'power1.out'
        });
      });
  });
</script>

<section class="tasting-section" aria-labelledby="tasting-title">
  <h2 id="tasting-title">Boek een proeflokaal</h2>
  {#if showDescription}
    <p class="tasting-description">
      Beleef onze bieren in een unieke sfeer. Reserveer jouw plek in ons proeflokaal en geniet van
      een rondleiding, proeverij en ambachtelijke hapjes.
    </p>
  {/if}

  <form
    class="tasting-form"
    on:submit={handleSubmit}
    aria-describedby="tasting-instructions"
    novalidate
  >
    <p id="tasting-instructions" class="sr-only">
      Vul het formulier in om een reservering te maken in het proeflokaal.
    </p>

    <div class="form-group">
      <label for="name">Naam</label>
      <input id="name" type="text" bind:value={name} placeholder="Je naam" required />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <input id="email" type="email" bind:value={email} placeholder="je@email.com" required />
    </div>

    <div class="form-group">
      <label for="date">Datum</label>
      <input id="date" type="date" bind:value={date} required />
    </div>

    <div class="form-group">
      <label for="guests">Aantal personen</label>
      <input id="guests" type="number" bind:value={guests} min="1" max="20" required />
    </div>

    <button type="submit" class="btn btn--primary">Reserveer nu</button>

    {#if success}
      <p class="success-message" role="status">Bedankt! Je reservering is ontvangen 🍻</p>
    {/if}

    {#if error}
      <p class="error-message" role="alert">{error}</p>
    {/if}
  </form>
</section>

<style>
.tasting-section {
  background: #4B2E05; 
  color: var(--text-color-alt);
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

h2 {
  font-size: 2rem;
  text-align: center;
  color: var(--text-color-alt);
  margin-bottom: 2rem;
  opacity: 0.9; /* zachtere toon */
}

.tasting-description {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 1.125rem;
  line-height: 1.6;
  max-width: 700px;
}

.tasting-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 700px;
  width: 100%;
  background: #ffffff;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-color);
}

.form-group input {
  padding: 0.9rem 1.1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  background: #fdfdfd;
  color: var(--text-color);
}

.form-group input:focus {
  outline: 2px solid var(--cta-buttons);
  outline-offset: 2px;
  border-color: var(--cta-buttons);
  background: #fff;
}

.btn {
  grid-column: span 2;
  justify-self: center;
  padding: 1rem 2.5rem;
  border-radius: 2rem;
  font-weight: 600;
  background: var(--cta-buttons);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background: #d24e0f;
  transform: translateY(-2px);
}

.success-message,
.error-message {
  grid-column: span 2;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}

.success-message {
  color: #2e7d32;
}

.error-message {
  color: #c62828;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .tasting-form {
    grid-template-columns: 1fr;
    padding: 2rem 1.5rem;
  }

  .btn {
    grid-column: 1;
    width: 100%;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
</style>
