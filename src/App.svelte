<script>
  import { routes, navigate } from './router.js';
  import { onMount } from 'svelte';

  let currentRoute = window.location.pathname;

  const updateRoute = () => currentRoute = window.location.pathname;

  onMount(() => {
    window.addEventListener('popstate', updateRoute);
    return () => window.removeEventListener('popstate', updateRoute);
  });

  const goTo = (path) => navigate(path);
</script>

<nav>
  <button on:click={() => goTo('/')}>Inicio</button>
  <button on:click={() => goTo('/dashboard')}>Dashboard</button>
  <button on:click={() => goTo('/nuevo-movimiento')}>Nuevo Movimiento</button>
</nav>

<main>
  {#if routes[currentRoute]}
    <svelte:component this={routes[currentRoute]} />
  {:else}
    <h2>Página no encontrada</h2>
  {/if}
</main>

<style>
  nav button { margin-right: 10px; }
</style>