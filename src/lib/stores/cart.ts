import { writable, derived } from 'svelte/store';
import type { CartItem } from '$lib/types/cart';

function createCart() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	return {
		subscribe,
		set,

		/** Voeg een item toe aan de winkelmand */
		add(item: CartItem) {
			update(items => {
				const existing = items.find(i => i.id === item.id);

				// Converteer price altijd naar number
				const price = Number(item.price) || 0;

				if (existing) {
					// Check max_quantity
					if (existing.max_quantity && existing.quantity >= existing.max_quantity) {
						return items;
					}

					existing.quantity += 1;
					existing.price = price; // houd prijs correct
					return [...items];
				}

				// Nieuw item toevoegen
				return [...items, { ...item, price, quantity: 1 }];
			});
		},

		/** Verwijder een item */
		remove(id: number) {
			update(items => items.filter(item => item.id !== id));
		},

		/** Update quantity van een item */
		updateQuantity(id: number, quantity: number) {
			update(items =>
				items.map(item =>
					item.id === id
						? { ...item, quantity: Math.max(1, quantity), price: Number(item.price) || 0 }
						: item
				)
			);
		},

		/** Wis de winkelmand */
		clear() {
			set([]);
		}
	};
}

export const cart = createCart();

/** Totaal aantal items in de winkelmand */
export const cartCount = derived(cart, $cart =>
	$cart.reduce((total, item) => total + item.quantity, 0)
);

/** Totale prijs van de winkelmand */
export const cartTotal = derived(cart, $cart =>
  $cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);


/** Winkelmand leegmaken */
export const clearCart = () => cart.clear();