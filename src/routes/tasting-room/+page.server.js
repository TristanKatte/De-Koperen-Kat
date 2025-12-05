import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const values = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      date: formData.get('date')?.toString() ?? '',
      people: formData.get('people')?.toString() ?? '',
      notes: formData.get('notes')?.toString() ?? ''
    };

    const errors = {
      name: !values.name ? 'Naam is verplicht' : null,
      email: !values.email ? 'E-mail is verplicht' : null,
      date: !values.date ? 'Datum is verplicht' : null,
      people: !values.people ? 'Aantal personen is verplicht' : null,
      notes: null // optioneel
    };

    const hasErrors = Object.values(errors).some(Boolean);

    if (hasErrors) {
      return fail(400, { form: { values, error: errors, success: false } });
    }

    // Verwerk de booking (bijvoorbeeld opslaan in Supabase)
    const { error: insertError } = await supabase.from('bookings').insert([values]);

    if (insertError) {
      console.error(insertError);
      return fail(500, {
        form: { values, error: { ...errors, submit: 'Er ging iets mis bij het verzenden.' }, success: false }
      });
    }

    // Bij succes reset de form
    return {
      form: {
        values: { name: '', email: '', date: '', people: '', notes: '' },
        error: { name: null, email: null, date: null, people: null, notes: null },
        success: true
      }
    };
  }
};
