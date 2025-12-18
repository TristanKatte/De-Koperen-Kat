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
			price: product.price_cents, // omzetting van centen naar euro's
			image_url: product.image_url,
			quantity: 1,
			max_quantity: product.max_quantity
		});
	}
</script>

<article class="product-detail" aria-labelledby="product-title">
	<div class="product-grid">
		<!-- Links: afbeelding -->
		<div class="product-media">
			{#if product.image_url}
				<img
					src={product.image_url}
					alt={`Afbeelding van ${product.title}`}
					loading="eager"
				/>
			{/if}
		</div>

		<!-- Rechts: content -->
		<div class="product-content">
			<h1 id="product-title">{product.title}</h1>

			<p class="price">
				{#if product.price_cents !== null}
					{priceFormatter.format(product.price_cents / 100)}
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
					<input
						type="number"
						min="1"
						max={product.max_quantity}
						bind:value={quantity}
					/>
				</label>

				<Button label="In winkelmand" onClick={addToCart} />
				
			</div>
		</div>
	</div>
</article>


<style>
	.product-detail {
	max-width: 900px;
	margin: 0 auto;
	padding: 5rem 1.5rem;
	color: var(--text-color, #2b2b2b);
}

.product-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 3rem;
}

/* Afbeelding */
.product-media img {
	width: 100%;
	max-height: 450px;
	object-fit: contain;
	border-radius: 1rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	transition: transform 0.3s ease;
}

.product-media img:hover {
	transform: scale(1.02);
}

/* Content */
.product-content h1 {
	font-size: 2.5rem;
	color: #4b2e05;
	margin-bottom: 0.5rem;
	font-weight: 700;
}

.price {
	font-size: 1.75rem;
	font-weight: 700;
	color: #4b2e05;
	margin-bottom: 1.5rem;
}

.description {
	font-size: 1.125rem;
	line-height: 1.7;
	color: #333;
	margin-bottom: 2rem;
}

/* Actions */
.actions {
	display: flex;
	align-items: flex-end;
	gap: 1rem;
}

.actions label {
	display: flex;
	flex-direction: column;
	font-size: 0.9rem;
	color: #555;
}

input {
	width: 4rem;
	padding: 0.4rem;
	font-size: 1rem;
}

/* Desktop */
@media (min-width: 768px) {
	.product-grid {
		grid-template-columns: 1fr 1fr;
		align-items: start;
	}
}

/* Mobile actions onder elkaar */
@media (max-width: 480px) {
	.actions {
		flex-direction: column;
		align-items: stretch;
	}
}

</style>
