<script lang="ts">
	let { id, name, options = [], value = $bindable(''), ariaInvalid, ariaDescribedBy } = $props();
</script>

<select
	id={id}
	name={name}
	bind:value
	aria-invalid={ariaInvalid}
	aria-describedby={ariaDescribedBy}
>
	{#each options as opt}
		<option value={opt.value}>{opt.label}</option>
	{/each}
</select>
