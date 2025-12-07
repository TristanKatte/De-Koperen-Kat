<script lang="ts">
  export let data: { events: { id: number; title: string; description: string; date: string; image?: string }[] };

  const events = data.events;
</script>

<section class="events-section">
  <h1>Recente Evenementen</h1>

  {#if events.length > 0}
    <div class="events-grid">
      {#each events as event (event.id)}
        <article class="event-card">
          {#if event.image}
            <img src={event.image} alt={event.title} />
          {/if}
          <div class="event-content">
            <h2>{event.title}</h2>
            <p class="event-date">{new Date(event.date).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
            <p>{event.description}</p>
          </div>
        </article>
      {/each}
    </div>
  {:else}
    <p class="no-events">Er zijn momenteel geen aankomende evenementen.</p>
  {/if}
</section>

<style>
.events-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.events-section h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.event-card {
  background: #f5f2eb;
  border-radius: 1rem;
  box-shadow: 0 6px 16px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.event-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.event-content {
  padding: 1rem;
}

.event-content h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 0.9rem;
  font-weight: 600;
  color: #d2691e;
  margin-bottom: 0.5rem;
}

.no-events {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
}
</style>
