<script lang="ts">
  import Button from '$lib/components/atoms/Button.svelte';
  export let events: any[] = [];
</script>

<section class="events-section" aria-labelledby="events-title">
  <h2 id="events-title">Agenda</h2>

  <div class="grid">
    {#each events.slice(0, 8) as event}
      <article class="event-card">
        {#if event.image_url}
          <img src={event.image_url} alt={event.title} />
        {/if}
        <h3>{event.title}</h3>
        <p>
          {new Date(event.date).toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
        {#if event.time}<p>Tijd: {event.time}</p>{/if}
        <p>{event.location}</p>
        {#if event.external_url}
          <a
            href={event.external_url}
            target="_blank"
            rel="noopener noreferrer"
            class="event-link"
            >Meer info</a
          >
        {/if}
      </article>
    {/each}
  </div>

  <div class="centered-button">
    <Button href="/events" label="Bekijk agenda" />
  </div>
</section>

<style>
.events-section {
  background-color: var(--accent-light);
  color: var(--text-color);
  padding: 5rem 1.5rem;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 2rem;
  box-sizing: border-box;
}

.event-card {
  background: #d9985f; /* iets lichter voor betere zichtbaarheid */
  border-radius: 1rem;
  border: 1px solid #b36b2f; /* subtiele rand */
  padding: 1.5rem;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08); /* lichte schaduw voor diepte */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #f5f5f0; /* lichte tekstkleur */
}

.event-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}


.event-card img {
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.event-link {
  color: var(--cta-buttons);
  text-decoration: underline;
  font-weight: 600;
}

.centered-button {
  text-align: center;
}

@media (max-width: 768px) {
  .events-section {
    padding: 3rem 1rem;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .event-card {
    padding: 1rem;
  }
}
</style>
