<script lang="ts">
  import ContactInfo from '$lib/components/organisms/ContactInfo.svelte';
  import ContactFormWrapper from '$lib/components/organisms/ContactFormWrapper.svelte';
  import Map from '$lib/components/organisms/Map.svelte';
</script>

<section class="contact-section">
  <ContactInfo />

  <div class="form-map-block">
    <ContactFormWrapper />
    <Map />
  </div>
</section>

<style>
.contact-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.form-map-block {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
