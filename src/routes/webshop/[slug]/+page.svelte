<script lang="ts">
    import { cart } from '$lib/stores/cart';
	import Button from '$lib/components/atoms/Button.svelte';

	export let data;
	const { product } = data;

	const priceFormatter = new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 2
	});

	let quantity = 1;

	function addToCart() {
		cart.add({
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			image_url: product.image_url,
			max_quantity: product.max_quantity,
			quantity: 0
		});
	}
</script>

<article class="product-detail">
	<div class="media">
		{#if product.image_url}
			<img src={product.image_url} alt={product.title} loading="eager" />
		{/if}
	</div>

	<div class="content">
		<h1>{product.title}</h1>

		<p class="price">
			{#if product.price_cents !== null}
				{priceFormatter.format(product.price_cents)}
			{:else}
				Prijs op aanvraag
			{/if}
		</p>

		{#if product.description}
			<p class="description">{product.description}</p>
		{/if}

		<div class="actions">
			<label>
				Aantal
				<input type="number" min="1" bind:value={quantity} />
			</label>

			<Button label="In winkelmand" onClick={addToCart} />
		</div>
	</div>
</article>

<style>
	.product-detail {
		display: flex;
	}

	.media {
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 1rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.description {
		margin-top: 1rem;
	}

	.price {
		font-weight: bold;
		margin-top: 1rem;
	}

	input {
		width: 4rem;
	}

	@media (max-width: 768px) {
		.product-detail {
			flex-direction: column;
		}
	}

	@media (max-width: 480px) {
		.actions {
			flex-direction: column;
		}
	}
</style>
