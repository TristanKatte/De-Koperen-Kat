<script lang="ts">
	import Label from '$lib/components/atoms/Label.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Error from '$lib/components/atoms/Error.svelte';

	let { label, name, value = $bindable(''), error = null, children } = $props();

	const id = crypto.randomUUID();
	const errorId = `${id}-error`;

	// fallback functie voor default input
	function defaultInput() {
		return (
			<Input
				id={id}
				name={name}
				bind:value
				ariaInvalid={error ? 'true' : undefined}
				ariaDescribedBy={error ? errorId : undefined}
			/>
		);
	}
</script>

<div class="form-field">
	<Label text={label} forId={id} />

	{@render children ?? defaultInput()}

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
