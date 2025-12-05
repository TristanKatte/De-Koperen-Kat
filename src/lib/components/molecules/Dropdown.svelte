<script lang="ts">
  export let label: string;           // Label voor het veld
  export let name: string;            // Naam van het formulier veld
  export let value: string = '';      // Gebonden waarde
  export let options: { value: string; label: string }[] = []; // Opties
  export let error: string | null = null; // Eventuele foutmelding
</script>

<div class="form-group">
  <label for={name}>{label}</label>
  <select id={name} name={name} bind:value={value}>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>

  {#if error}
    <p class="error-message" role="alert">{error}</p>
  {/if}
</div>

<style>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

select {
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>
