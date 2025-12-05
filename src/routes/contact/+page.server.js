import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const values = {
			name: formData.get('name')?.toString() ?? '',
			email: formData.get('email')?.toString() ?? '',
			message: formData.get('message')?.toString() ?? '',
			category: formData.get('category')?.toString() ?? ''
		};

		const errors = {
			name: !values.name ? 'Naam is verplicht' : null,
			email: !values.email ? 'Email is verplicht' : null,
			message: !values.message ? 'Bericht is verplicht' : null,
			category: !values.category ? 'Categorie is verplicht' : null
		};

		const hasErrors = Object.values(errors).some(Boolean);

		if (hasErrors) {
			return fail(400, { form: { values, error: errors, success: false } });
		}

		// Hier zou je normaal gesproken de gegevens verwerken, zoals het verzenden van een e-mail
		console.log('Verzonden:', values);

		return { form: { values: { name: '', email: '', message: '', category: '' }, error: { name: null, email: null, message: null, category: null }, success: true } };
	}
};
