<script lang="ts">
  import Button from '$lib/components/atoms/Button.svelte';
</script>

<section class="proeflokaal-wrapper">
  <div class="proeflokaal-teaser">
    <div class="content">
      <h2>Bezoek ons Proeflokaal</h2>
      <p>
        Beleef onze bieren in een unieke sfeer. Reserveer jouw plek voor een rondleiding, proeverij 
        of groepsbezoek eenvoudig online.
      </p>
      <Button href="/tasting-room" label="Reserveer nu" />
    </div>

    <div class="image">
      <img
        src="/images/bar-gloed-1.jpg"
        alt="Gezellige sfeer in het proeflokaal"
        width="800"
        height="500"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</section>


<style>
/* FULL-WIDTH ACHTERGROND */
.proeflokaal-wrapper {
  background-color: var(--background-alt);
  padding: 5rem 1.5rem;
}

/* INNER GRID */
.proeflokaal-teaser {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #f5f5f0; /* tekstkleur */
}

.content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: #f5f5f0; /* tekstkleur */
}

.image img {
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .proeflokaal-teaser {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .content {
    order: 2;
  }

  .image {
    order: 1;
  }
}
</style>
