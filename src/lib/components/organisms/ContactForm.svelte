<script lang="ts">
	import FormField from '$lib/components/molecules/FormField.svelte';
	import FormButton from '$lib/components/atoms/FormButton.svelte';

	let form = {
		values: { name: '', email: '', message: '', category: '' },
		error: { name: null, email: null, message: null, category: null },
		success: false
	};
</script>

<form method="POST" novalidate>
	<FormField label="Naam" name="name" value={form.values.name} error={form.error.name} />
	<FormField label="Email" name="email" type="email" value={form.values.email} error={form.error.email} />
	<FormField label="Bericht" name="message" type="textarea" value={form.values.message} error={form.error.message} />
	<FormField
		label="Categorie"
		name="category"
		type="select"
		value={form.values.category}
		error={form.error.category}
		options={[
			{ value: '', label: 'Selecteer...' },
			{ value: 'feedback', label: 'Feedback' },
			{ value: 'support', label: 'Support' }
		]}
	/>
	<FormButton label="Verstuur" />

	{#if form.success}
		<p class="success" role="status" aria-live="polite">Je bericht is verzonden!</p>
	{/if}
</form>

<style>
form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
.success {
	color: green;
	font-weight: 500;
}
</style>
