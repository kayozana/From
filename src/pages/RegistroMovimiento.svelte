<script>
  let descripcion = "";
  let monto = "";
  let tipo = "gasto"; // gasto o ingreso
  let fecha = "";
</script>

<h1>Registrar Movimiento</h1>

<form on:submit|preventDefault={() => console.log({ descripcion, monto, tipo, fecha })}>
  <label>Descripción</label>
  <input bind:value={descripcion} placeholder="Ej: Mercado" />

  <label>Monto</label>
  <input type="number" bind:value={monto} placeholder="Ej: 50000" />

  <label>Tipo</label>
  <select bind:value={tipo}>
    <option value="gasto">Gasto</option>
    <option value="ingreso">Ingreso</option>
  </select>

  <label>Fecha</label>
  <input type="date" bind:value={fecha} />

  <button type="submit">Guardar</button>
</form>