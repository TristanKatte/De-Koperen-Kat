export type BookingFormState = {
	values: {
		name: string;
		email: string;
		date: string;
		people: string;
		notes: string;
	};
	error: {
		name: string | null;
		email: string | null;
		date: string | null;
		people: string | null;
		notes: string | null;
		submit?: string;
	};
	success: boolean;
};
