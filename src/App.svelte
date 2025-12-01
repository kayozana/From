<script>
// @ts-nocheck

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
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  nav {
    display: flex;
    gap: 15px;
    background: var(--nav-bg);
    color: var(--nav-text);
    padding: 15px 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.12);
  }

  button {
    padding: 8px 16px;
    background: var(--button-bg);
    border: none;
    border-radius: 5px;
    color: var(--button-text);
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s, transform 0.08s;
  }

  button:hover {
    background: color-mix(in srgb, var(--button-bg) 75%, var(--accent));
    transform: translateY(-1px);
  }

  main {
    padding: 20px;
  }

  h2 {
    color: var(--text);
  }

  .page {
    background: var(--card);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.06);
    color: var(--text);
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