<!-- src/lib/components/organisms/ContactFormWrapper.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import ContactForm from '$lib/components/organisms/ContactForm.svelte';

  let formData = {
    values: { name: '', email: '', message: '', category: '' },
    error: { name: null, email: null, message: null, category: null },
    success: false
  };

  function handleEnhance(formEl: HTMLFormElement) {
    return enhance(formEl);
  }
</script>

<form class="contact-form" use:handleEnhance method="POST" novalidate>
  <ContactForm  />
</form>
<style>
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 1.5rem;
    border-top: 4px solid var(--accent);
    padding: 2rem;
    background-color: var(--background-soft);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
</style>