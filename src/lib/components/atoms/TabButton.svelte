<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let active: boolean = false;
  export let id: string;
  export let ariaControls: string;

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('select');
  };
</script>

<button
  id={id}
  role="tab"
  aria-selected={active}
  aria-controls={ariaControls}
  class:active
  on:click={handleClick}
>
  <slot />
</button>

<style>
button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  color: #555;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s, color 0.2s;
  width: 33.33%;
}

button.active,
button:hover {
  color: #c4661f;
  border-bottom-color: #c4661f;
}
</style>
