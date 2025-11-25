<script lang="ts">
  import PhotoGrid from '$lib/components/molecules/PhotoGrid.svelte';
  export let title: string;
  export let content: string;
  export let photos: string[];
  export let reverse: boolean = false;
</script>

<section class="section-block {reverse ? 'reverse' : ''}">
  <div class="text">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
  <PhotoGrid {photos} />
</section>

<style>
.section-block {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  margin-bottom: 5rem;
}

.section-block h2 {
  text-align: left;
}

.section-block.reverse {
  flex-direction: column-reverse;
}

@media (min-width: 768px) {
  .section-block {
    flex-direction: row;
    align-items: flex-start;
  }
  .section-block.reverse {
    flex-direction: row-reverse;
  }
}
</style>
