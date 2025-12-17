import { writable, derived } from 'svelte/store';
import type { CartItem } from '$lib/types/cart';

function createCart() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	return {
		subscribe,

		// 👇 voeg dit toe
		set,

		add(item: CartItem) {
			update(items => {
				const existing = items.find(i => i.id === item.id);

				if (existing) {
					if (
						existing.max_quantity &&
						existing.quantity >= existing.max_quantity
					) {
						return items;
					}

					existing.quantity += 1;
					return [...items];
				}

				return [...items, { ...item, quantity: 1 }];
			});
		},

		remove(id: number) {
			update(items => items.filter(item => item.id !== id));
		},

		updateQuantity(id: number, quantity: number) {
			update(items =>
				items.map(item =>
					item.id === id
						? { ...item, quantity: Math.max(1, quantity) }
						: item
				)
			);
		},

		clear() {
			set([]);
		}
	};
}

export const cart = createCart();

export const cartCount = derived(cart, items =>
	items.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartTotal = derived(cart, items =>
	items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
