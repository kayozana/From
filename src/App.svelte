<script>
  import { routes, navigate } from './router.js';
  import { onMount, onDestroy } from 'svelte';

  let currentRoute = '/';

  const normalize = (p) => (p ? p.replace(/\/+$/, '') : '/') || '/';

  const onPopState = () => {
    currentRoute = normalize(window.location.pathname);
  };

  onMount(() => {
    window.addEventListener('popstate', onPopState);
    currentRoute = normalize(window.location.pathname);
  });

  onDestroy(() => {
    window.removeEventListener('popstate', onPopState);
  });
</script>

<style>
  .app-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background: #f5f7fa;
    min-height: 100vh;
  }

  nav {
    display: flex;
    gap: 15px;
    background: #4f46e5; /* Azul intenso */
    padding: 15px 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  button {
    padding: 8px 16px;
    background: #6366f1; /* Azul más claro */
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #818cf8;
  }

  main {
    padding: 20px;
  }

  h2 {
    color: #374151;
  }

  .page {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  }
</style>

<div class="app-container">
  <nav>
    <button on:click={() => navigate('/')}>Inicio</button>
    <button on:click={() => navigate('/dashboard')}>Dashboard</button>
    <button on:click={() => navigate('/nuevo-movimiento')}>Nuevo Movimiento</button>
  </nav>

  <main>
    {#if routes[currentRoute]}
      <div class="page">
        <svelte:component this={routes[currentRoute]} />
      </div>
    {:else}
      <h2>Página no encontrada</h2>
    {/if}
  </main>
</div>