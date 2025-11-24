<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let open: boolean = false;
  export let title: string = '';
  export let content: string = '';

  // Sluit modal
  const close = () => {
    dispatch('close');
  };

  // Escape-toets ondersteuning
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
  };

  // Focus modal bij openen
  let modalEl: HTMLDivElement;

  onMount(() => {
    if (open && modalEl) modalEl.focus();
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if open}
  <div
    class="backdrop"
    on:click={close}
    aria-hidden="true"
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabindex="0"
      bind:this={modalEl}
      on:click|stopPropagation
    >
      <button
        type="button"
        class="close-btn"
        on:click={close}
        aria-label="Sluit modal"
      >&times;</button>
      <h3 id="modal-title">{title}</h3>
      <p>{content}</p>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal {
    background: #fff;
    padding: 2rem;
    border-radius: 0.75rem;
    max-width: 500px;
    width: 90%;
    outline: none;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .close-btn:focus {
    outline: 2px solid var(--accent-dark, #4b2e05);
    outline-offset: 2px;
  }
</style>
