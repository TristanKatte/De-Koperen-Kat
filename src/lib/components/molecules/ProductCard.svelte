<script lang="ts">
  import Button from '../atoms/Button.svelte';
  let { product } = $props();
</script>

<article class="product-card">
  {#if product.image_url}
    <div class="image-wrapper">
      <img
        src={product.image_url}
        alt={product.title}
        loading="lazy"
      />
    </div>
  {/if}

  <div class="product-info">
    <h3 class="product-title">{product.title}</h3>

    <p class="product-description">{product.description}</p>

    <p class="product-price">
      {#if product.price_cents}
        €{(product.price_cents.toFixed(2))}
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
  flex-direction: column;
  background: var(--card-background);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* VASTE VIERKANTE AFBEELDING */
.image-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: transparent;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* INFO ONDER DE AFBEELDING */
.product-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  font-size: 1rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color-alt);
}

.product-description {
  font-size: 1rem;
  color: var(--text-color-alt);
}

.product-price {
  font-weight: 700;
  margin-top: auto;
  color: var(--text-color-alt);
}

.product-button {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
</style>
