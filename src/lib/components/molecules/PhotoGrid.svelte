<!-- src/lib/components/molecules/PhotoGrid.svelte -->
<script lang="ts">
  import Polaroid from './Polaroid.svelte';
  export let photos: string[];
</script>

<div class="photo-grid">
  {#each photos as photo, i}
    <Polaroid src={photo} alt={`Foto ${i + 1}`} rotation={i % 2 === 0 ? -5 : 5} />
  {/each}
</div>

<style>
.photo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
@media (max-width: 768px) {
  .photo-grid {
    gap: 0.5rem;
  }
}
</style>
