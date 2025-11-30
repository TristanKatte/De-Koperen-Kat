<script lang="ts">
	let { id, name, type = 'text', value = $bindable(''), ariaInvalid, ariaDescribedBy } = $props();
</script>

<input
	id={id}
	name={name}
	type={type}
	bind:value
	aria-invalid={ariaInvalid}
	aria-describedby={ariaDescribedBy}
/>

<style>
    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>