<script>
  import RegistroMovimiento from './RegistroMovimiento.svelte';
  import MetasView from '../metas/MetasView.svelte';
  import ProgressBar from '../metas/ProgressBar.svelte';
</script>

<style>
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .dashboard-container {
    max-width: 900px;
    margin: auto;
    padding: 1rem;
  }
  .section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
</style>

<div class="dashboard-container">
  <h1>Dashboard</h1>

  <div class="section">
    <h2>Registrar Movimiento</h2>
    <RegistroMovimiento />
  </div>

  <div class="section">
    <h2>Mis Metas</h2>
    <MetasView />
    <ProgressBar />
  </div>
</div>
