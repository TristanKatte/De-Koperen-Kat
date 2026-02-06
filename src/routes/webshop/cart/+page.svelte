<script lang="ts">
	import { cart, cartTotal } from '$lib/stores/cart';
	import Button from '$lib/components/atoms/Button.svelte';

	const formatter = new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR'
	});
</script>

<h1 class="cart-title">Winkelmand</h1>

{#if $cart.length === 0}
	<p class="empty-cart">Je winkelmand is leeg.</p>
{:else}
	<ul class="cart-list">
		{#each $cart as item}
			<li class="cart-item">
				<div class="item-info">
					<strong class="item-title">{item.title}</strong>
				</div>

				<div class="item-controls">
					<input
						type="number"
						min="1"
						max={item.max_quantity}
						value={item.quantity}
						on:change={(e) =>
							cart.updateQuantity(item.id, +e.currentTarget.value)
						}
					/>

					<button
						class="remove"
						aria-label="Verwijder item"
						on:click={() => cart.remove(item.id)}
					>
						✕
					</button>
				</div>
			</li>
		{/each}
	</ul>

	<div class="cart-summary">
		<p class="total">
			Totaal:
			<strong>{formatter.format($cartTotal / 100)}</strong>
		</p>

		<Button label="Verder naar aanvraag" href="/contact" />
	</div>
{/if}

<style>
	.cart-title {
	max-width: 900px;
	margin: 4rem auto 2rem;
	padding: 0 1.5rem;
	font-size: 2.5rem;
	color: #4b2e05;
	font-weight: 700;
}

.empty-cart {
	max-width: 900px;
	margin: 0 auto;
	padding: 0 1.5rem;
	font-size: 1.125rem;
}

.cart-list {
	max-width: 900px;
	margin: 0 auto;
	padding: 0 1.5rem;
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

/* Item kaart */
.cart-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.25rem 1.5rem;
	border-radius: 1rem;
	background: #fff;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.item-title {
	font-size: 1.125rem;
	color: #333;
}

/* Controls */
.item-controls {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.cart-item input {
	width: 3.5rem;
	padding: 0.35rem;
	font-size: 1rem;
}

.remove {
	background: none;
	border: none;
	font-size: 1.2rem;
	cursor: pointer;
	color: var(--color-danger);
}

/* Summary */
.cart-summary {
	max-width: 900px;
	margin: 2.5rem auto 5rem;
	padding: 0 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	align-items: flex-start;
}

.total {
	font-size: 1.5rem;
	color: #4b2e05;
}

/* Mobile tweaks */
@media (max-width: 480px) {
	.cart-item {
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}

	.item-controls {
		align-self: flex-end;
	}
}

</style>
