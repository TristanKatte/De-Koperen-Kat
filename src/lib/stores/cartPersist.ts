import { cart } from './cart';
import { browser } from '$app/environment';

if (browser) {
	const stored = localStorage.getItem('cart');
	if (stored) {
		cart.set(JSON.parse(stored));
	}

	cart.subscribe(value => {
		localStorage.setItem('cart', JSON.stringify(value));
	});
}
