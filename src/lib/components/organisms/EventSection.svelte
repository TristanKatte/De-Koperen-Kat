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
          <a href={event.external_url} target="_blank" rel="noopener noreferrer" class="event-link">
            Meer info
          </a>
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
  text-align: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
}
.event-card {
  background: var(--card-background);
  color: var(--text-color);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: left;
}
.event-card img {
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.event-link {
  color: var(--cta-buttons);
  font-weight: 600;
  text-decoration: underline;
}
.centered-button {
  text-align: center;
  margin-top: 1rem;
}
</style>
