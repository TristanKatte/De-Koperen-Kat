<script lang="ts">
	let { text = '', forId } = $props();
</script>

<label for={forId}>{text}</label>

<style>
    label {
        display: block;
        margin-top: 0.95rem;
    }
</style>