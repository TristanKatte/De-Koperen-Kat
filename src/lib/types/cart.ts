export interface CartItem {
	id: number;
	slug: string;
	title: string;
	price: number; // euro bedrag
	image_url?: string;
	quantity: number;
	max_quantity?: number;
}
