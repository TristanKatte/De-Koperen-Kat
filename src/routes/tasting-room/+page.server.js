/** @type {import('./$types').PageServerLoad} */
export function load() {
	// Default timeslots
	return {
		timeslots: [
			{ value: '09:00', label: '09:00 – 10:00' },
			{ value: '10:00', label: '10:00 – 11:00' },
			{ value: '11:00', label: '11:00 – 12:00' }
		]
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') || '';
		const email = data.get('email') || '';
		const date = data.get('date') || '';
		const timeslot = data.get('timeslot') || '';

		const errors = {};

		if (!name) errors.name = 'Naam is verplicht';
		if (!email) errors.email = 'Email is verplicht';
		if (!date) errors.date = 'Datum is verplicht';
		if (!timeslot) errors.timeslot = 'Tijdslot is verplicht';

		if (Object.keys(errors).length > 0) {
			return {
				success: false,
				errors,
				values: { name, email, date, timeslot }
			};
		}

		// Hier kun je de reservering opslaan
		console.log('Proeflokaal geboekt:', { name, email, date, timeslot });

		return { success: true };
	}
};
