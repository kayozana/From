<script>
// @ts-nocheck

  import * as stores from '../stores.js';
  import { derived } from 'svelte/store';

  const { movimientos, metas } = stores;

  // Totales
  const totalGastos = derived(movimientos, $movimientos =>
    $movimientos.filter(m => m.tipo === 'gasto').reduce((a,b) => a + +b.monto, 0)
  );

  const totalIngresos = derived(movimientos, $movimientos =>
    $movimientos.filter(m => m.tipo === 'ingreso').reduce((a,b) => a + +b.monto, 0)
  );
</script>

<style>
  h2 { color: var(--text); }
  .dashboard { display: flex; flex-direction: column; gap: 20px; max-width: 600px; }
  .card { padding: 15px; border-radius: 10px; background: var(--card); box-shadow: 0 3px 10px rgba(0,0,0,0.05); }
  .metas { display: flex; flex-direction: column; gap: 10px; }
  .meta { padding: 10px; background: color-mix(in srgb, var(--card) 85%, black 5%); border-radius: 8px; }
  .progress { background: color-mix(in srgb, var(--muted) 18%, transparent); border-radius: 5px; height: 10px; overflow: hidden; }
  .progress-bar { height: 10px; background: linear-gradient(90deg, var(--progress-start), var(--progress-end)); }
</style>

<div class="dashboard">
  <div class="card">
    <h2>Totales</h2>
    <p>Total Gastos: $ {$totalGastos}</p>
    <p>Total Ingresos: $ {$totalIngresos}</p>
  </div>

  <div class="card metas">
    <h2>Metas</h2>
    {#each $metas as meta}
      <div class="meta">
        <strong>{meta.nombre}</strong>
        <div class="progress">
          <div class="progress-bar" style="width: {Math.min(meta.ahorrado / meta.objetivo * 100, 100)}%"></div>
        </div>
        <small>${meta.ahorrado} / ${meta.objetivo}</small>
      </div>
    {/each}
  </div>
</div>