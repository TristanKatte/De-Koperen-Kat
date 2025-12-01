<script lang="ts">
  import Button from '$lib/components/atoms/Button.svelte';

  export let events: {
    title: string;
    slug: string;
    image_url?: string;
    date: string;
    time?: string;
    location?: string;
    external_url?: string;
  }[] = [];
</script>


<section class="events-section" aria-labelledby="events-title">
  <h2 id="events-title">Agenda</h2>

  <div class="grid">
    {#each events.slice(0, 8) as event}
      <article class="event-card">
        {#if event.image_url}
          <img src={event.image_url} alt={event.title} />
        {:else}
          <div class="event-placeholder" aria-hidden="true">📅</div>
        {/if}

        <div class="event-content">
          <h3>{event.title}</h3>
          <p class="date">
            {new Date(event.date).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          {#if event.time}<p>Tijd: {event.time}</p>{/if}
          <p>{event.location}</p>
        </div>

        <div class="card-button">
          {#if event.external_url}
            <a href={event.external_url} target="_blank" rel="noopener noreferrer" class="btn btn--primary">Meer info</a>
          {:else}
            <Button href={`/agenda/${event.slug}`} label="Meer info" />
          {/if}
        </div>
      </article>
    {/each}
  </div>

  <div class="centered-button">
    <Button href="/agenda" label="Bekijk agenda" />
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
  margin-bottom: 2.5rem;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--background-alt);
  border-radius: 1rem;
  border: 1px solid #1b1007;
  padding: 1.5rem;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, outline 0.2s ease;
  color: var(--text-color-alt);
}

.event-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

/* Focus-within voor toegankelijkheid */
.event-card:focus-within,
.event-card:focus {
  outline: 3px solid #1b1007;
  outline-offset: 4px;
}

.event-card img {
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.event-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  width: 100%;
  background: rgba(255,255,255,0.1);
  border-radius: 0.5rem;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.event-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-color-alt);
}

.event-content p {
  margin: 0.2rem 0;
  line-height: 1.4;
}

.card-button {
  margin-top: auto;
  margin-top: 2.5rem;
}

.btn {
  display: inline-block;
  padding: 0.7rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  background-color: var(--cta-secondary);
  color: #fff;
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.btn:hover {
  background-color: #c74d0d;
  transform: scale(1.05);
}

.centered-button {
  text-align: center;
  margin-top: 3rem;
}

/* RESPONSIVE */
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

  .centered-button {
    margin-top: 2.5rem;
  }
}
</style>
