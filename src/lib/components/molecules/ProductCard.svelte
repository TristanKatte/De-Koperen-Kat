<script lang="ts">
	import Button from '../atoms/Button.svelte';
	let { product } = $props();
</script>

<article class="product-card">
	{#if product.image_url}
		<div class="image-wrapper">
			<img src={product.image_url} alt={product.title} loading="lazy" />
		</div>
	{/if}

	<div class="product-info">
		<h3 class="product-title">{product.title}</h3>

		<p class="product-description">{product.description}</p>

		<p class="product-price">
			{#if product.price_cents}
				€{(product.price_cents / 100).toFixed(2)}
			{:else}
				Prijs op aanvraag
			{/if}
		</p>

		<div class="product-button">
			<Button href={`/webshop/${product.slug}`} label="Bekijk product" />
		</div>
	</div>
</article>

<style>
	.product-card {
  display: flex;
  flex-direction: row; /* Row layout zoals event cards */
  background: var(--card-background-alt);
  border-radius: 1.25rem;
  border: 1px solid var(--card-border);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  overflow: hidden;
  position: relative;
  transition: transform .3s ease, box-shadow .3s ease;
  align-items: stretch; /* Zorg dat alle children dezelfde hoogte hebben */
}

/* Koperen accentlijn */
.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 6px;
  width: 100%;
  background: linear-gradient(
    90deg,
    var(--accent-dark),
    var(--accent-light)
  );
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.15);
}

/* Afbeelding links */
.image-wrapper {
  flex: 0 0 180px; /* vaste breedte */
  height: 180px;   /* vaste hoogte, zorgt dat alle cards gelijk zijn */
  overflow: hidden;
  background: var(--card-background);
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .4s ease;
}

.product-card:hover img {
  transform: scale(1.03);
}

/* Inhoud rechts */
.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  flex: 1; /* neemt alle resterende ruimte in */
  justify-content: space-between;
  background: var(--card-background-alt);
}

.product-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-dark);
}

.product-description {
  font-size: .95rem;
  color: #3a2a1a;
  line-height: 1.5;
}

.product-price {
  font-weight: 700;
  color: var(--accent-dark);
}

/* Button onderaan de card */
.product-button {
  margin-top: 1rem;
}

/* Responsive: stap terug naar column op mobiel */
@media (min-width: 48rem) {
  .product-card {
    flex-direction: column;
    align-items: stretch;
  }

  .image-wrapper {
    width: 100%;
    height: 180px; /* zelfde hoogte blijft behouden */
  }
}
</style>
