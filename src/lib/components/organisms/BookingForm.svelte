<script lang="ts">
	import FormField from '$lib/components/molecules/FormField.svelte';
	import FormButton from '$lib/components/atoms/FormButton.svelte';
	import { enhance } from '$app/forms';

	const { form } = $props();
</script>

<form method="POST" novalidate use:enhance>
	<FormField label="Naam" name="name" value={form.values.name} error={form.error.name} />
	<FormField
		label="E-mail"
		name="email"
		type="email"
		value={form.values.email}
		error={form.error.email}
	/>
	<FormField
		label="Datum"
		name="date"
		type="date"
		value={form.values.date}
		error={form.error.date}
	/>
	<FormField
		label="Aantal personen"
		name="people"
		type="number"
		value={form.values.people}
		error={form.error.people}
	/>
	<FormField
		label="Opmerkingen"
		name="notes"
		type="textarea"
		value={form.values.notes}
		error={form.error.notes}
	/>

	<FormButton label="Boeken" />

	{#if form.success}
		<p class="success" role="status" aria-live="polite">Je boeking is succesvol verzonden!</p>
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
