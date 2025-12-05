<script lang="ts">
	interface Props {
		label: string;
		type?: 'submit' | 'button' | 'reset';
		disabled?: boolean;
	}

	let {
		label,
		type = 'submit',
		disabled = false
	}: Props = $props();
</script>

<button
	type={type}
	disabled={disabled}
	class="form-btn"
>
	{label}
</button>

<style>
.form-btn {
	background: var(--cta-buttons);
	color: white;
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	border: 1px solid var(--cta-secondary);
	cursor: pointer;
	font-weight: 600;
	text-decoration: none;
	transition: 0.3s;
	width: 100%; /* optioneel voor forms */
	margin-top: 2rem;
}
.form-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
.form-btn:hover:not(:disabled) {
	background: var(--cta-hover);
}
</style>
