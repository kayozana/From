<script>
  let descripcion = "";
  let monto = "";
  let tipo = "gasto";
  let fecha = "";
</script>

<h1>Registrar Movimiento</h1>

<form on:submit|preventDefault={() => console.log({ descripcion, monto, tipo, fecha })}>
  <label for="descripcion">Descripción</label>
  <input id="descripcion" bind:value={descripcion} placeholder="Ej: Mercado" />

  <label for="monto">Monto</label>
  <input id="monto" type="number" bind:value={monto} placeholder="Ej: 50000" />

  <label for="tipo">Tipo</label>
  <select id="tipo" bind:value={tipo}>
    <option value="gasto">Gasto</option>
    <option value="ingreso">Ingreso</option>
  </select>

  <label for="fecha">Fecha</label>
  <input id="fecha" type="date" bind:value={fecha} />

  <button type="submit">Guardar</button>
</form>
<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }

  label {
    margin-top: 10px;
  }

  input, select, button {
    margin-top: 5px;
    padding: 8px;
    font-size: 1em;
  }

  button {
    margin-top: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>