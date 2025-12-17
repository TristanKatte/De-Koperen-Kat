<script lang="ts">
    import WebshopList from '$lib/components/organisms/WebshopList.svelte';
    let { data } = $props();
</script>

<svelte:head>
    <title>Webshop</title>
</svelte:head>

<WebshopList products={data.products} />