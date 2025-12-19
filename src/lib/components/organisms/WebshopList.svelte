<script lang="ts">
    import ProductCard from "../molecules/ProductCard.svelte";
    export let products: Array<any> = [];
</script>

<section class="webshop-list">
    {#each products as product (product.id)}
        <ProductCard {product} />
    {/each}
</section>

<style>
.webshop-list {
    display: grid;
    grid-template-columns: 1fr; /* Mobiel: 1 kolom */
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}


@media (min-width: 600px) {
    .webshop-list {
        grid-template-columns: repeat(2, 1fr); /* Tablet: 2 kolommen */
    }
}

@media (min-width: 900px) {
    .webshop-list {
        grid-template-columns: repeat(3, 1fr); /* Desktop: 3 kolommen */
    }
}

@media (min-width: 1200px) {
    .webshop-list {
        grid-template-columns: repeat(3, 1fr); /* Grote desktop: 5 kolommen */
    }
}
</style>
