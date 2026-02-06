<!-- src/lib/components/atoms/Counter.svelte -->
<script lang="ts">
  interface Props {
    value: string;
    label: string;
  }

  let { value, label }: Props = $props();
</script>

<div class="counter-wrapper" role="region" aria-label={label}>
  <span class="counter">{value}</span>
  <p>{label}</p>
</div>

<style>
.counter-wrapper {
  text-align: center;
  background: #c27c3a;
  color: #fff;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  gap: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.counter {
  font-size: 2rem;
  font-weight: 700;
}
</style>
