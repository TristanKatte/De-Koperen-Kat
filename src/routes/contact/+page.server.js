/** @type {import('./$types').PageServerLoad} */
export function load() {
	// Default select options
	return {
		categories: [
			{ value: '', label: 'Selecteer...' },
			{ value: 'feedback', label: 'Feedback' },
			{ value: 'support', label: 'Support' }
		]
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') || '';
		const email = data.get('email') || '';
		const message = data.get('message') || '';
		const category = data.get('category') || '';

		const errors = {};

		if (!name) errors.name = 'Naam is verplicht';
		if (!email) errors.email = 'Email is verplicht';
		if (!message) errors.message = 'Bericht is verplicht';

		if (Object.keys(errors).length > 0) {
			return {
				success: false,
				errors,
				values: { name, email, message, category }
			};
		}

		// Hier kun je de data opslaan of mail versturen
		console.log('Contact formulier verzonden:', { name, email, message, category });

		return { success: true };
	}
};
