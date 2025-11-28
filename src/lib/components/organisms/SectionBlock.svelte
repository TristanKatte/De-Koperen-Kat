<script lang="ts">
  import PhotoGrid from '$lib/components/molecules/PhotoGrid.svelte';
  interface Props {
    title: string;
    content: string;
    photos: string[];
    reverse?: boolean;
  }

  let {
    title,
    content,
    photos,
    reverse = false
  }: Props = $props();
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
