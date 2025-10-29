<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';

  let name = '';
  let email = '';
  let message = '';
  let success = false;
  let error: string | null = null;

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = null;
    success = false;

    if (!name || !email || !message) {
      error = 'Vul alstublieft alle velden in.';
      return;
    }

    const { error: insertError } = await supabase.from('contacts').insert([
      { name, email, message }
    ]);

    if (insertError) {
      console.error(insertError);
      error = 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.';
      return;
    }

    success = true;
    name = '';
    email = '';
    message = '';
  }
</script>

<section class="contact-section" aria-labelledby="contact-title">
  <h1 id="contact-title">Neem contact op</h1>
  <p class="contact-description">
    Heb je vragen of wil je ons bereiken? Vul het formulier in of bekijk onze locatie hieronder.
  </p>

  <div class="contact-grid">
    <!-- Formulier -->
    <form class="contact-form" on:submit={handleSubmit} aria-describedby="contact-instructions">
      <p id="contact-instructions" class="sr-only">
        Vul je naam, e-mail en bericht in om contact op te nemen.
      </p>

      <div class="form-group">
        <label for="name">Naam</label>
        <input id="name" type="text" bind:value={name} required placeholder="Je naam" />
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input id="email" type="email" bind:value={email} required placeholder="je@email.com" />
      </div>

      <div class="form-group">
        <label for="message">Bericht</label>
        <textarea id="message" bind:value={message} required placeholder="Typ je bericht hier"></textarea>
      </div>

      <button type="submit" class="btn">Verstuur bericht</button>

      {#if success}
        <p role="status" class="success-message">Bedankt! Je bericht is verzonden.</p>
      {/if}

      {#if error}
        <p role="alert" class="error-message">{error}</p>
      {/if}
    </form>

    <!-- Contact info & kaart -->
    <aside class="contact-info">
      <h2>Onze locatie</h2>
      <p>Proeflokaal ABC<br />Straatnaam 123<br />1234 AB Stad</p>
      <p>📞 +31 6 12345678</p>
      <p>✉️ info@proeflokaal.nl</p>

      <div class="map-container" aria-label="Kaart van locatie">
        <iframe 
          src="https://www.google.com/maps/embed?pb=..." 
          width="100%" 
          height="300" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </aside>
  </div>
</section>

<style>
  .contact-section {
    padding: 4rem 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .contact-description {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.125rem;
    color: #333;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .contact-form {
    display: grid;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  input, textarea {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }

  button.btn {
    padding: 1rem 2rem;
    border-radius: 2rem;
    background-color: #d2691e;
    color: white;
    border: none;
    cursor: pointer;
  }

  .contact-info h2 {
    margin-bottom: 1rem;
  }

  .map-container iframe {
    border-radius: 1rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }

    button.btn {
      width: 100%;
    }
  }
</style>
