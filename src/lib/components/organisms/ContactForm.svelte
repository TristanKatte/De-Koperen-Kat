<script lang="ts">
	import { enhance } from '$app/forms';
	import FormField from '$lib/components/molecules/FormField.svelte';
	import FormButton from '$lib/components/atoms/FormButton.svelte';

	type ContactForm = {
		values: {
			name: string;
			email: string;
			message: string;
			category: string;
		};
		error: {
			name: string | null;
			email: string | null;
			message: string | null;
			category: string | null;
		};
		success: boolean;
	};

	let form: ContactForm = {
		values: { name: '', email: '', message: '', category: '' },
		error: { name: null, email: null, message: null, category: null },
		success: false
	};

	function handleEnhance({ result }: { result: any }) {
		// Cast result naar jouw type
		form = result as ContactForm;
	}
</script>

<form method="POST"  novalidate use:enhance>
	<FormField label="Naam" name="name" value={form.values.name} error={form.error.name} />
	<FormField label="Email" name="email" type="email" value={form.values.email} error={form.error.email} />
	<FormField label="Bericht" name="message" type="textarea" value={form.values.message} error={form.error.message} />

	<FormButton label="Verstuur" />

	{#if form.success}
		<p class="success" role="status" aria-live="polite">Je bericht is verzonden!</p>
	{/if}
</form>


<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}
	.success {
		color: green;
		font-weight: 500;
	}
</style>
