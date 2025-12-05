<script>
  export let title = '';
</script>

<div class="page-wrapper">
  {#if title}
    <h2>{title}</h2>
  {/if}
  <div class="page-content">
    <slot />
  </div>
</div>

<style>
  .page-wrapper { max-width: 900px; margin: 0 auto; }
  .page-wrapper h2 { margin: 0 0 12px 0; color: var(--text); }
  .page-content { background: var(--card); padding: 18px; border-radius: 10px; box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
</style>
