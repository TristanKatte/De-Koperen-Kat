<script lang="ts">
  import Button from '../atoms/Button.svelte';
  let { product } = $props();
</script>

<article class="product-card">
  {#if product.image_url}
    <img
      class="product-image"
      src={product.image_url}
      alt={product.title}
      loading="lazy"
    />
  {/if}

  <div class="product-info">
    <h3 class="product-title">{product.title}</h3>

    <p class="product-description">{product.description}</p>

    <p class="product-price">
      {#if product.price_cents}
        €{product.price_cents}
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
    width: 100%;
    height: auto;
    overflow: hidden;
    background: #fff;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.product-image {
    width: 100%;
    aspect-ratio: 1 / 1; /* dit maakt de afbeelding vierkant */
    object-fit: cover;
}

.product-info {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
}

.product-price {
  font-weight: 700;
}

.product-button {
  margin-top: auto;
  margin: 1rem;
}
</style>
