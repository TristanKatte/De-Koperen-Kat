<script lang="ts">
	import Label from '$lib/components/atoms/Label.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Error from '$lib/components/atoms/Error.svelte';

	interface Props {
		label: string;
		name: string;
		value?: string;
		error?: string | null;
		type?: 'text' | 'email' | 'textarea' | 'select';
		children?: (() => any) | null;
		options?: { value: string; label: string }[];
	}

	let {
		label,
		name,
		value = $bindable(''),
		error = null,
		type = 'text',
		children = null,
		options = []
	}: Props = $props();

	const id = crypto.randomUUID();
	const errorId = `${id}-error`;
</script>

<div class="form-field">
	<Label text={label} forId={id} />

	{#if children}
		{@html ''} <!-- slot placeholder, children niet gebruiken om parse errors te voorkomen -->
	{:else if type === 'textarea'}
		<textarea
			id={id}
			name={name}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? errorId : undefined}
		></textarea>
	{:else if type === 'select'}
		<select
			id={id}
			name={name}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? errorId : undefined}
		>
			{#each options as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	{:else}
		<Input
			id={id}
			name={name}
			type={type}
			bind:value
			ariaInvalid={error ? 'true' : undefined}
			ariaDescribedBy={error ? errorId : undefined}
		/>
	{/if}

	{#if error}
		<Error id={errorId} message={error} />
	{/if}
</div>

<style>
.form-field {
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
}
</style>
