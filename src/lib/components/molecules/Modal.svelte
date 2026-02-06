<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
  import { createEventDispatcher, onMount, afterUpdate } from "svelte";
  import { gsap } from "gsap";

  const dispatch = createEventDispatcher();

  export let open: boolean = false;
  export let title: string = "";
  export let content: string = "";

  let backdropEl: HTMLDivElement;
  let modalEl: HTMLDivElement;

  const close = () => dispatch("close");

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  // Speel animatie af wanneer open → true wordt
  afterUpdate(() => {
    if (open && modalEl && backdropEl) {
      animateOpen();
      modalEl.focus();
    }
  });

  const animateOpen = () => {
    gsap.fromTo(
      backdropEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      modalEl,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power3.out"
      }
    );
  };

  const animateClose = () => {
    return new Promise<void>((resolve) => {
      gsap.to(modalEl, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in"
      });

      gsap.to(backdropEl, {
        opacity: 0,
        duration: 0.25,
        ease: "power1.in",
        onComplete: resolve
      });
    });
  };

  // Intercept close click → speel animatie → pas daarna echt sluiten
  const handleBackdropClick = async () => {
    await animateClose();
    close();
  };

  const handleButtonClick = async () => {
    await animateClose();
    close();
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });
</script>

{#if open}
  <div
    class="backdrop"
    bind:this={backdropEl}
    on:click={handleBackdropClick}
    aria-hidden="true"
  >
    <div
      class="modal"
      bind:this={modalEl}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabindex="0"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <button
        type="button"
        class="close-btn"
        on:click={handleButtonClick}
        aria-label="Sluit modal"
      >
        &times;
      </button>

      <h3 id="modal-title">{title}</h3>

      <div class="modal-text">
        {@html content}
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    opacity: 0; /* gsap */
  }

  .modal {
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 550px;
    width: 92%;
    outline: none;
    position: relative;
    box-shadow: 0 10px 40px rgba(0,0,0,0.25);
    opacity: 0; /* gsap */
    transform-origin: center;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.6rem;
  }


  .close-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: transparent;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    color: #333;
  }

  .close-btn:hover {
    color: #000;
  }

  .close-btn:focus {
    outline: 3px solid var(--accent-dark, #4b2e05);
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    .modal {
      padding: 1.5rem;
    }

    h3 {
      font-size: 1.4rem;
    }
  }
</style>
