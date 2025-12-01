<script>
// @ts-nocheck

  import { movimientos } from '../stores.js';
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
  h2 { color: #4f46e5; }
  form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }
  input, select { padding: 8px; border-radius: 5px; border: 1px solid #ccc; }
  button { padding: 10px; background: #6366f1; color: white; border: none; border-radius: 5px; cursor: pointer; }
  button:hover { background: #818cf8; }
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