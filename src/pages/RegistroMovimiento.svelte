<script>
// @ts-nocheck

  import * as stores from '../stores.js';
  const { movimientos } = stores;
  import { get } from 'svelte/store';

  let descripcion = '';
  let monto = 0;
  let tipo = 'gasto';
  let fecha = '';

  const guardarMovimiento = () => {
    if (!descripcion || !monto || !fecha) return;
    movimientos.update((items) => [
      ...items,
      { id: items.length + 1, descripcion, monto, tipo, fecha }
    ]);
    // Limpiar formulario
    descripcion = '';
    monto = 0;
    tipo = 'gasto';
    fecha = '';
    alert('Movimiento guardado');
  };
</script>

<style>
  h2 { color: var(--text); }
  form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }
  form > div { display: flex; flex-direction: column; gap: 6px; text-align: left; }
  label { color: var(--muted); font-size: 0.95rem; }
  input, select {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid color-mix(in srgb, var(--muted) 30%, transparent);
    background: color-mix(in srgb, var(--card) 96%, black 2%);
    color: var(--text);
  }
  input::placeholder { color: color-mix(in srgb, var(--muted) 55%, transparent); }
  button { padding: 10px; background: var(--accent); color: var(--button-text); border: none; border-radius: 5px; cursor: pointer; }
  button:hover { background: color-mix(in srgb, var(--accent) 75%, black 10%); }
</style>

<h2>Registrar Movimiento</h2>
<form on:submit|preventDefault={guardarMovimiento}>
  <div>
    <label for="descripcion">Descripción</label>
    <input id="descripcion" name="descripcion" type="text" placeholder="Descripción" bind:value={descripcion} />
  </div>

  <div>
    <label for="monto">Monto</label>
    <input id="monto" name="monto" type="number" placeholder="Monto" bind:value={monto} />
  </div>

  <div>
    <label for="tipo">Tipo</label>
    <select id="tipo" name="tipo" bind:value={tipo}>
      <option value="gasto">Gasto</option>
      <option value="ingreso">Ingreso</option>
    </select>
  </div>

  <div>
    <label for="fecha">Fecha</label>
    <input id="fecha" name="fecha" type="date" bind:value={fecha} />
  </div>

  <button type="submit">Guardar</button>
</form>