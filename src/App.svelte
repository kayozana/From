<script>
  // @ts-nocheck
  import Login from './pages/Login.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  import Movimientos from './pages/Movimientos.svelte';
  import Metas from './metas/MetasView.svelte';

  let isLoggedIn = $state(false);
  let currentPage = $state('dashboard');
  let sidebarOpen = $state(false);

  function navigate(page) {
    currentPage = page;
    sidebarOpen = false;
  }

  function handleLogin() {
    isLoggedIn = true;
  }
</script>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f1f5f9;
    color: #0f172a;
  }

  .app {
    display: flex;
    min-height: 100vh;
  }

  /* Sidebar */
  .sidebar {
    width: 250px;
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 1000;
    box-shadow: 4px 0 20px rgba(0,0,0,0.1);
  }

  .logo {
    padding: 24px 20px;
    font-size: 1.5rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .nav {
    flex: 1;
    padding: 20px 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    color: #94a3b8;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s;
    border-left: 3px solid transparent;
  }

  .nav-item:hover {
    background: rgba(255,255,255,0.05);
    color: #e2e8f0;
  }

  .nav-item.active {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
    border-left-color: #3b82f6;
  }

  .nav-icon {
    font-size: 1.3rem;
    width: 24px;
  }

  .user-section {
    padding: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .user-info {
    flex: 1;
  }

  .user-name {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .user-status {
    font-size: 0.75rem;
    color: #10b981;
  }

  /* Main content */
  .main-content {
  flex: 1;
  margin-left: 250px;
  padding: 40px 48px; /* ← Cambiado de 32px */
  background: #f8fafc;
}

.content-wrapper {
  max-width: 100%; /* ← Cambiado de 1400px */
  margin: 0 auto;
}

  /* Mobile */
  .mobile-header {
    display: none;
    background: white;
    padding: 16px 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .menu-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 8px;
    color: #1e293b;
  }

  .mobile-logo {
    font-size: 1.3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  }

  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s;
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .overlay.show {
      display: block;
    }

    .main-content {
      margin-left: 0;
      padding: 20px 16px;
    }

    .mobile-header {
      display: flex;
    }
  }
</style>

{#if !isLoggedIn}
  <Login onLogin={handleLogin} />
{:else}
  <div class="app">
    <!-- Mobile Header -->
    <div class="mobile-header">
      <button class="menu-btn" onclick={() => sidebarOpen = !sidebarOpen}>
        ☰
      </button>
      <div class="mobile-logo">💼 EMS</div>
      <div style="width: 40px;"></div>
    </div>

    <!-- Overlay -->
    <div class="overlay" class:show={sidebarOpen} onclick={() => sidebarOpen = false}></div>

    <!-- Sidebar -->
    <aside class="sidebar" class:open={sidebarOpen}>
      <div class="logo">
        <span>💼</span>
        <span>EMS App</span>
      </div>

      <nav class="nav">
        <button
          class="nav-item"
          class:active={currentPage === 'dashboard'}
          onclick={() => navigate('dashboard')}
        >
          <span class="nav-icon">📊</span>
          <span>Dashboard</span>
        </button>

        <button
          class="nav-item"
          class:active={currentPage === 'movimientos'}
          onclick={() => navigate('movimientos')}
        >
          <span class="nav-icon">💰</span>
          <span>Movimientos</span>
        </button>

        <button
          class="nav-item"
          class:active={currentPage === 'metas'}
          onclick={() => navigate('metas')}
        >
          <span class="nav-icon">🎯</span>
          <span>Metas</span>
        </button>
      </nav>

      <div class="user-section">
        <div class="user-avatar">JD</div>
        <div class="user-info">
          <div class="user-name">Usuario</div>
          <div class="user-status">● En línea</div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-wrapper">
        {#if currentPage === 'dashboard'}
          <Dashboard />
        {:else if currentPage === 'movimientos'}
          <Movimientos />
        {:else if currentPage === 'metas'}
          <Metas />{:else if currentPage === 'metas'}
        {/if}
      </div>
    </main>
  </div>
{/if}