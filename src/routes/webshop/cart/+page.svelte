<script lang="ts">
	import { cart, cartTotal } from '$lib/stores/cart';
	import Button from '$lib/components/atoms/Button.svelte';

	const formatter = new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR'
	});
</script>

<h1>Winkelmand</h1>

{#if $cart.length === 0}
	<p>Je winkelmand is leeg.</p>
{:else}
	<ul class="cart-list">
		{#each $cart as item}
			<li class="cart-item">
				<strong>{item.title}</strong>

				<input
					type="number"
					min="1"
					max={item.max_quantity}
					value={item.quantity}
					on:change={(e) =>
						cart.updateQuantity(item.id, +e.currentTarget.value)
					}
				/>

				<span>
					{formatter.format(item.price * item.quantity)}
				</span>

				<button on:click={() => cart.remove(item.id)}>✕</button>
			</li>
		{/each}
	</ul>

	<p class="total">
		Totaal: <strong>{formatter.format($cartTotal)}</strong>
	</p>

	<Button label="Verder naar aanvraag" href="/contact" />
{/if}

<style>
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .cart-item input {
        width: 3rem;
        margin: 0 1rem;
    }

    .cart-item button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: var(--color-danger);
    }

    .cart-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .total {
        font-size: 1.2rem;
        margin-top: 1rem;
    }
</style>