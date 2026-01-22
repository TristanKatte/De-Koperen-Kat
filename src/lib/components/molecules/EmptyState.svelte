<script lang="ts">
  let { message = "Geen items beschikbaar", icon = "🍻" } = $props();
</script>

<p class="empty-message" role="status">
  {message} {icon}
</p>

<style>
    .empty-message {
    text-align: center;
    margin-top: 3rem;
    font-size: 1.2rem;
    color: #ccc;
  }
</style>