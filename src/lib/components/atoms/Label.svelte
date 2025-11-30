<script lang="ts">
	let { text = '', forId } = $props();
</script>

<label for={forId}>{text}</label>

<style>
    label {
        display: block;
        margin-bottom: 0.5rem;
    }
</style>