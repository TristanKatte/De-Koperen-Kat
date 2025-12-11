<script lang="ts">
  import Button from '$lib/components/atoms/Button.svelte';
  export let v;
</script>

<article class="vacature-card">
  {#if v.image_url}
    <img src={v.image_url} alt={v.title} />
  {/if}

  <h2>{v.title}</h2>

  <Button href={`/vacancies/${v.slug}`} label="Meer info" />

</article>

<style>
  .vacature-card {
    background: #f5f2eb;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    transition: transform 0.25s;
  }

  .vacature-card:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
</style>
