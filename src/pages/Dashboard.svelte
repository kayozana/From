<script>
// @ts-nocheck
import PageWrapper from '../components/PageWrapper.svelte';
import ProgressBar from '../metas/ProgressBar.svelte';
import { movimientos, metas } from '../stores.js';
import { derived } from 'svelte/store';

// Totales
const totalGastos = derived(movimientos, $movimientos =>
  $movimientos.filter(m => m.tipo === 'gasto').reduce((a,b) => a + Number(b.monto), 0)
);

const totalIngresos = derived(movimientos, $movimientos =>
  $movimientos.filter(m => m.tipo === 'ingreso').reduce((a,b) => a + Number(b.monto), 0)
);

const balance = derived([totalGastos, totalIngresos], ([$g, $i]) => $i - $g);

// Estadísticas por categoría/tipo
const gastosPorTipo = derived(movimientos, $movimientos => {
  const grupos = {};
  $movimientos.filter(m => m.tipo === 'gasto').forEach(m => {
    grupos[m.descripcion] = (grupos[m.descripcion] || 0) + Number(m.monto);
  });
  return Object.entries(grupos).sort((a, b) => b[1] - a[1]).slice(0, 5);
});

// Progreso de metas
const metasProgress = derived(metas, $metas =>
  $metas.map(m => ({ ...m, pct: Math.min((m.ahorrado / m.objetivo) * 100, 100) }))
);

const totalMetasAhorrado = derived(metas, $metas =>
  $metas.reduce((a, b) => a + Number(b.ahorrado), 0)
);

const totalMetasObjetivo = derived(metas, $metas =>
  $metas.reduce((a, b) => a + Number(b.objetivo), 0)
);

const maxGasto = derived(gastosPorTipo, $gastosPorTipo => $gastosPorTipo[0]?.[1] ?? 0);
</script>

<style>
  .dashboard { display: flex; flex-direction: column; gap: 20px; }
  .card { padding: 18px; border-radius: 10px; background: var(--card); box-shadow: 0 3px 10px rgba(0,0,0,0.05); }
  .card h3 { margin: 0 0 14px 0; color: var(--text); }
  .card p { margin: 6px 0; }
  .empty { color: var(--muted); font-size: 0.9rem; margin: 0; }
  
  /* Overview */
  .overview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
  .overview-item { padding: 14px; border-radius: 8px; background: color-mix(in srgb, var(--card) 85%, black 3%); border-left: 4px solid var(--accent); }
  .overview-item.income { border-left-color: var(--progress-start); }
  .overview-item.expense { border-left-color: #ef4444; }
  .overview-item.positive { border-left-color: var(--progress-start); }
  .overview-item.negative { border-left-color: #ef4444; }
  .overview-item .label { color: var(--muted); font-size: 0.85rem; margin-bottom: 6px; }
  .overview-item .amount { font-size: 1.3rem; font-weight: 700; color: var(--text); }

  /* Chart */
  .chart { display: flex; flex-direction: column; gap: 12px; }
  .chart-item { display: grid; grid-template-columns: 80px 1fr 60px; gap: 12px; align-items: center; }
  .chart-item .label { font-size: 0.9rem; color: var(--muted); }
  .bar-container { height: 20px; background: color-mix(in srgb, var(--muted) 12%, transparent); border-radius: 4px; overflow: hidden; }
  .bar { height: 100%; background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 60%, transparent)); }
  .chart-item .value { text-align: right; font-weight: 600; color: var(--text); font-size: 0.9rem; }

  /* Metas */
  .metas { display: flex; flex-direction: column; gap: 12px; }
  .meta { padding: 12px; background: color-mix(in srgb, var(--card) 85%, black 3%); border-radius: 8px; }
  .meta-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .meta-header strong { color: var(--text); }
  .pct { background: var(--accent); color: var(--button-text); padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; }
  .meta-footer { display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.85rem; color: var(--muted); }
  .meta-footer .saved { font-weight: 600; color: var(--progress-start); }
  .meta-summary { margin-top: 16px; padding: 12px; background: color-mix(in srgb, var(--muted) 8%, transparent); border-radius: 8px; }
  .meta-summary p { margin: 6px 0; font-size: 0.95rem; }
  .meta-summary strong { color: var(--accent); }
</style>

<PageWrapper title="Dashboard — Análisis Detallado">
  <div class="dashboard">
    <div class="card overview">
      <h3>📊 Estado Financiero</h3>
      <div class="overview-grid">
        <div class="overview-item income">
          <div class="label">Ingresos Totales</div>
          <div class="amount">${$totalIngresos}</div>
        </div>
        <div class="overview-item expense">
          <div class="label">Gastos Totales</div>
          <div class="amount">${$totalGastos}</div>
        </div>
        <div class="overview-item" class:positive={$balance >= 0} class:negative={$balance < 0}>
          <div class="label">Balance Neto</div>
          <div class="amount">${$balance}</div>
        </div>
      </div>
    </div>

      {#if $gastosPorTipo.length}
        <div class="chart">
          {#each $gastosPorTipo as [concepto, monto], i}
            <div class="chart-item">
              <span class="label">{concepto}</span>
              <div class="bar-container">
                <div class="bar" style="width: {$maxGasto ? (monto / $maxGasto) * 100 : 0}%"></div>
              </div>
              <span class="value">${monto}</span>
            </div>
          {/each}
        </div>
      {:else}
        <p class="empty">Sin gastos registrados.</p>
      {/if}
    </div>

    <div class="card">
      <h3>🎯 Progreso de Metas ({$metas.length})</h3>
      {#if $metasProgress.length}
        <div class="metas">
          {#each $metasProgress as m}
            <div class="meta">
              <div class="meta-header">
                <strong>{m.nombre}</strong>
                <span class="pct">{Math.round(m.pct)}%</span>
              </div>
              <ProgressBar porcentaje={m.pct} />
              <div class="meta-footer">
                <span class="saved">${m.ahorrado}</span>
                <span class="target">Meta: ${m.objetivo}</span>
              </div>
            </div>
          {/each}
        </div>

        <div class="meta-summary">
          <p>Total ahorrado en metas: <strong>${$totalMetasAhorrado}</strong></p>
          <p>Total objetivo: <strong>${$totalMetasObjetivo}</strong></p>
          <p>Falta: <strong>${$totalMetasObjetivo - $totalMetasAhorrado}</strong></p>
        </div>
      {:else}
        <p class="empty">Sin metas creadas.</p>
      {/if}
    </div>
</PageWrapper>
