<script lang="ts">
    import WebshopList from '$lib/components/organisms/WebshopList.svelte';
    let { data } = $props();
</script>

<svelte:head>
    <title>Webshop</title>
</svelte:head>

<p>
    Onderstaande producten zijn via de webshop te bestellen, mits aangegeven en/of op voorraad.
    <br />
    Onze bieren kan je bij de brouwerij proeven en eventueel bestellen. Zij zijn echter (nog) niet via de webshop leverbaar.
</p>

<WebshopList products={data.products} />

<style>
    p {
        margin-bottom: 2rem;
        color: var(--text-color, #2b2b2b);
        line-height: 1.5;
        font-size: 1.1rem;
        margin: 0 auto;
        padding: 1rem;
        border-radius: 1rem;
        max-width: 600px;
        background-color: var(--background-warm);
    }
</style>