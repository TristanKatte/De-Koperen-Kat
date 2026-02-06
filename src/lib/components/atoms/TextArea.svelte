<script lang="ts">
	let { id, name, value = $bindable(''), ariaInvalid, ariaDescribedBy } = $props();
</script>

<textarea
	id={id}
	name={name}
	bind:value
	aria-invalid={ariaInvalid}
	aria-describedby={ariaDescribedBy}>
</textarea>


<style>
    textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>