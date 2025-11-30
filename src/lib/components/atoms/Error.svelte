<script lang="ts">
	let { id, message = '' } = $props();
</script>

<p id={id} role="alert" aria-live="polite" class="error">
	{message}
</p>

<style>
.error {
	color: var(--error);
	font-size: 0.9rem;
}
</style>
