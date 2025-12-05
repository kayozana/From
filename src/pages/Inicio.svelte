<script>
import PageWrapper from '../components/PageWrapper.svelte';
import ProgressBar from '../metas/ProgressBar.svelte';
import { movimientos, metas, createId } from '../stores.js';
import { derived } from 'svelte/store';

const totalGastos = derived(movimientos, $movimientos => $movimientos.filter(m => m.tipo === 'gasto').reduce((a,b) => a + Number(b.monto), 0));
const totalIngresos = derived(movimientos, $movimientos => $movimientos.filter(m => m.tipo === 'ingreso').reduce((a,b) => a + Number(b.monto), 0));
const balance = derived([totalGastos, totalIngresos], ([$g, $i]) => $i - $g);
const recientes = derived(movimientos, $movimientos => $movimientos.slice().reverse().slice(0,5));

// Quick add
let descripcion = '';
let monto = ''; // string for input
let tipo = 'gasto';

function quickAdd() {
  if (!descripcion || !monto) return;
  movimientos.update(items => [
    ...items,
    { id: createId('m-'), descripcion: descripcion.trim(), monto: Number(monto), tipo, fecha: new Date().toISOString().slice(0,10) }
  ]);
  descripcion = '';
  monto = '';
  tipo = 'gasto';
}
</script>

<PageWrapper title="Inicio — Resumen Financiero">
  <div class="intro">
    <p>Hola 👋 — Aquí tienes un resumen rápido de tu actividad financiera y acceso a tus metas.</p>
  </div>

  <div class="stats">
    <div class="stat card">
      <div class="label">💰 Ingresos</div>
      <div class="value">${$totalIngresos}</div>
    </div>
    <div class="stat card">
      <div class="label">💸 Gastos</div>
      <div class="value">${$totalGastos}</div>
    </div>
    <div class="stat card balance" class:positive={$balance >= 0} class:negative={$balance < 0}>
      <div class="label">📊 Balance</div>
      <div class="value">${$balance}</div>
    </div>
  </div>

  <div class="sections">
    <section class="card recent">
      <h3>📝 Últimos movimientos</h3>
      {#if $recientes.length}
        <ul>
          {#each $recientes as r (r.id)}
            <li class:income={r.tipo === 'ingreso'} class:expense={r.tipo === 'gasto'}>
              <span class="desc">{r.descripcion}</span>
              <span class="amount">${r.monto}</span>
              <span class="date">{r.fecha}</span>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="empty">No hay movimientos todavía. ¡Comienza a registrar!</p>
      {/if}
    </section>

    <div class="side">
      <section class="card quick-add">
        <h3>➕ Agregar rápido</h3>
        <div class="form">
          <input placeholder="Descripción" bind:value={descripcion} />
          <input placeholder="Monto" type="number" bind:value={monto} min="0" />
          <select bind:value={tipo}>
            <option value="gasto">💸 Gasto</option>
            <option value="ingreso">💰 Ingreso</option>
          </select>
          <button on:click={quickAdd}>Guardar</button>
        </div>
      </section>

      <section class="card metas">
        <h3>🎯 Metas ({$metas.length})</h3>
        {#if $metas.length}
          <div class="meta-list">
            {#each $metas as m (m.id)}
              <div class="meta-item">
                <strong>{m.nombre}</strong>
                <ProgressBar porcentaje={Math.round((m.ahorrado / m.objetivo) * 100)} />
                <small>${m.ahorrado} / ${m.objetivo}</small>
              </div>
            {/each}
          </div>
        {:else}
          <p class="empty">No hay metas. Crea una para empezar.</p>
        {/if}
      </section>
    </div>
  </div>
</PageWrapper>

<style>
  .intro { margin-bottom: 18px; color: var(--muted); font-size: 1rem; line-height: 1.5; }
  .stats { display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:12px; margin-bottom:18px; }
  .stat { padding:16px; text-align:left; border-left: 4px solid var(--accent); }
  .stat.balance.positive { border-left-color: var(--progress-start); }
  .stat.balance.negative { border-left-color: #ef4444; }
  .label { color: var(--muted); font-size:0.85rem; margin-bottom: 6px; }
  .value { font-size:1.35rem; font-weight:700; color:var(--text); }
  .sections { display:grid; gap:16px; grid-template-columns: 1fr; }
  @media(min-width:1000px){ .sections { grid-template-columns: 1fr 380px; } }
  .side { display: grid; gap: 16px; grid-template-columns: 1fr; }
  .recent ul { list-style:none; padding:0; margin:0; }
  .recent li { padding:10px 8px; border-bottom:1px solid color-mix(in srgb, var(--muted) 12%, transparent); display: grid; grid-template-columns: 1fr auto auto; gap: 12px; align-items: center; }
  .recent li.income { border-left: 3px solid var(--progress-start); padding-left: 8px; }
  .recent li.expense { border-left: 3px solid #ef4444; padding-left: 8px; }
  .recent .desc { font-weight: 500; }
  .recent .amount { font-weight: 700; color: var(--accent); }
  .recent .date { color: var(--muted); font-size: 0.85rem; }
  .empty { color: var(--muted); font-size: 0.9rem; margin: 8px 0; }
  .quick-add .form { display:flex; flex-direction:column; gap:10px; }
  .quick-add input, .quick-add select { padding:10px; border-radius:6px; border:1px solid color-mix(in srgb, var(--muted) 30%, transparent); background: color-mix(in srgb, var(--card) 96%, black 2%); color:var(--text); }
  .quick-add button { padding:10px; background:var(--accent); color:var(--button-text); border:none; border-radius:6px; cursor: pointer; font-weight: 600; }
  .quick-add button:hover { background: color-mix(in srgb, var(--accent) 75%, black 10%); }
  .meta-list { display: flex; flex-direction: column; gap: 12px; }
  .meta-item { padding: 10px; background: color-mix(in srgb, var(--card) 85%, black 3%); border-radius: 8px; }
  .meta-item strong { display: block; margin-bottom: 6px; }
  .meta-item small { color: var(--muted); font-size: 0.85rem; display: block; margin-top: 4px; }
</style>
