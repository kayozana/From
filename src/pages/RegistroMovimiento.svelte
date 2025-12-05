<script>
  // @ts-nocheck
  import PageWrapper from '../components/PageWrapper.svelte';
  import { movimientos, createId } from '../stores.js';

let descripcion = '';
let monto = ''; // string for input
let tipo = 'gasto';
let fecha = new Date().toISOString().slice(0,10);
let mensaje = '';
let mostrarMensaje = false;

const guardarMovimiento = () => {
  if (!descripcion.trim()) {
    mensaje = '❌ Escribe una descripción.';
    mostrarMensaje = true;
    setTimeout(() => mostrarMensaje = false, 3000);
    return;
  }
  if (!monto || Number(monto) <= 0) {
    mensaje = '❌ El monto debe ser mayor a 0.';
    mostrarMensaje = true;
    setTimeout(() => mostrarMensaje = false, 3000);
    return;
  }
  if (!fecha) {
    mensaje = '❌ Selecciona una fecha.';
    mostrarMensaje = true;
    setTimeout(() => mostrarMensaje = false, 3000);
    return;
  }

  movimientos.update((items) => [
    ...items,
    { id: createId('m-'), descripcion: descripcion.trim(), monto: Number(monto), tipo, fecha }
  ]);

  descripcion = '';
  monto = '';
  tipo = 'gasto';
  fecha = new Date().toISOString().slice(0,10);

  mensaje = '✅ Movimiento guardado correctamente.';
  mostrarMensaje = true;
  setTimeout(() => mostrarMensaje = false, 3000);
};

const onKeyPress = (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    guardarMovimiento();
  }
};
</script>

<style>
  form { display: flex; flex-direction: column; gap: 12px; max-width: 100%; }
  form > div { display: flex; flex-direction: column; gap: 8px; }
  label { color: var(--muted); font-size: 0.9rem; font-weight: 500; }
  input, select {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid color-mix(in srgb, var(--muted) 30%, transparent);
    background: color-mix(in srgb, var(--card) 96%, black 2%);
    color: var(--text);
    font-size: 1rem;
  }
  input::placeholder { color: color-mix(in srgb, var(--muted) 55%, transparent); }
  button { 
    padding: 12px; 
    background: var(--accent); 
    color: var(--button-text); 
    border: none; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: 600;
    transition: background 0.2s;
  }
  button:hover { background: color-mix(in srgb, var(--accent) 75%, black 10%); }
  .alert { padding: 12px; border-radius: 6px; margin-bottom: 8px; font-weight: 500; }
  .alert.success { background: color-mix(in srgb, var(--progress-start) 15%, transparent); color: var(--progress-start); }
  .alert.error { background: color-mix(in srgb, #ef4444 15%, transparent); color: #ef4444; }
  .hint { color: var(--muted); font-size: 0.85rem; margin-top: 12px; margin-bottom: 0; }
</style>

<PageWrapper title="Registrar Nuevo Movimiento">
  <form on:submit|preventDefault={guardarMovimiento}>
    {#if mostrarMensaje}
      <div class="alert" class:success={mensaje.startsWith('✅')} class:error={mensaje.startsWith('❌')}>
        {mensaje}
      </div>
    {/if}

    <div>
      <label for="descripcion">📝 Descripción</label>
      <input id="descripcion" name="descripcion" type="text" placeholder="ej: Supermercado, Transporte, Sueldo..." bind:value={descripcion} maxlength="100" />
    </div>

    <div>
      <label for="monto">💵 Monto</label>
      <input id="monto" name="monto" type="number" placeholder="0.00" min="0" step="0.01" bind:value={monto} />
    </div>

    <div>
      <label for="tipo">🏷️ Tipo de movimiento</label>
      <select id="tipo" name="tipo" bind:value={tipo}>
        <option value="gasto">💸 Gasto</option>
        <option value="ingreso">💰 Ingreso</option>
      </select>
    </div>

    <div>
      <label for="fecha">📅 Fecha</label>
      <input id="fecha" name="fecha" type="date" bind:value={fecha} />
    </div>

    <button type="submit">💾 Guardar Movimiento</button>
    <p class="hint">💡 Consejo: Presiona Ctrl+Enter para guardar rápidamente.</p>
  </form>
</PageWrapper>