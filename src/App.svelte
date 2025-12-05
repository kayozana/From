<script>
// @ts-nocheck

  import { routes, navigate } from './router.js';
  import { onMount, onDestroy } from 'svelte';

  let currentRoute = '/';

  // Normaliza rutas (quita barras al final)
  const normalize = (p) => (p ? p.replace(/\/+$/, '') : '/') || '/';

  // Resuelve la ruta actual o vuelve a inicio si no existe
  const resolveRoute = () => {
    const raw = normalize(window.location.pathname);
    return routes[raw] ? raw : '/';
  };

  const onPopState = () => {
    currentRoute = resolveRoute();
  };

  onMount(() => {
    window.addEventListener('popstate', onPopState);
    currentRoute = resolveRoute();
  });

  onDestroy(() => {
    window.removeEventListener('popstate', onPopState);
  });
</script>

<style>
  :root {
    --bg: #f7f7f7;
    --text: #222;
    --nav-bg: #ffffff;
    --nav-text: #222;
    --button-bg: #4c6ef5;
    --button-text: #fff;
    --accent: #3b5bdb;
    --card: #ffffff;
    --muted: #6b7280;
    --progress-start: #16a34a;
  }

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

  nav button.active {
    box-shadow: 0 2px 0 0 color-mix(in srgb, var(--accent) 60%, transparent) inset;
    transform: translateY(-1px);
  }

  main {
    padding: 20px;
  }

  .page {
    background: var(--card);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.06);
    color: var(--text);
    margin-top: 20px;
  }
</style>

<div class="app-container">
  <nav>
    <button class:active={currentRoute === '/'} on:click={() => navigate('/')}>Inicio</button>
    <button class:active={currentRoute === '/dashboard'} on:click={() => navigate('/dashboard')}>Dashboard</button>
    <button class:active={currentRoute === '/nuevo-movimiento'} on:click={() => navigate('/nuevo-movimiento')}>Nuevo Movimiento</button>
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
