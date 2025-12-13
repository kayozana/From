<script>
  import ModalNuevoMovimiento from '../components/ModalNuevoMovimiento.svelte';
  import { movimientos, createId } from '../stores.js';

  let modalAbierto = false;

  function guardarMovimiento(movimiento) {
  movimientos.update(lista => [
    ...lista,
    {
      id: createId('m-'),
      fecha: movimiento.fecha,
      descripcion: movimiento.descripcion,
      monto: movimiento.monto,
      tipo: movimiento.tipo,

      // ✅ CAMELCASE (lo que TS espera)
      cuentaId: String(movimiento.cuenta_id),
      categoriaId: String(movimiento.categoria_id),

      // solo visual por ahora
      cuenta: movimiento.cuenta_id === 1 ? 'Efectivo' : 'Banco',
      categoria: 'Pendiente'
    }
  ]);

    modalAbierto = false;
  }
</script>

<div class="page">
  <h1>💰 Movimientos</h1>

  <div class="actions">
    <button class="btn-nuevo" on:click={() => modalAbierto = true}>
      ➕ Nuevo Movimiento
    </button>
  </div>

  <div class="tabla-container">
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Descripción</th>
          <th>Cuenta</th>
          <th>Categoría</th>
          <th>Tipo</th>
          <th>Monto</th>
        </tr>
      </thead>

      <tbody>
        {#each $movimientos as mov}
          <tr>
            <td>{mov.fecha}</td>
            <td><strong>{mov.descripcion}</strong></td>
            <td>{mov.cuenta ?? '-'}</td>
            <td>{mov.categoria ?? '-'}</td>
            <td>
              <span class="tipo-badge {mov.tipo}">
                {mov.tipo === 'ingreso' ? '💰 Ingreso' : '💸 Gasto'}
              </span>
            </td>
            <td>
              <span class="monto {mov.tipo}">
                {mov.tipo === 'ingreso' ? '+' : '-'}$
                {mov.monto.toLocaleString()}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <ModalNuevoMovimiento
    bind:isOpen={modalAbierto}
    onSave={guardarMovimiento}
  />
</div>

<style>
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .actions {
    margin-bottom: 20px;
  }

  .btn-nuevo {
    padding: 12px 20px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
  }

  .tabla-container {
    background: var(--card);
    border-radius: 12px;
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: #f1f5f9;
  }

  th, td {
    padding: 14px;
    text-align: left;
  }

  tbody tr {
    border-top: 1px solid #e2e8f0;
  }

  .tipo-badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .tipo-badge.ingreso {
    background: rgba(16,185,129,.15);
    color: #059669;
  }

  .tipo-badge.gasto {
    background: rgba(239,68,68,.15);
    color: #dc2626;
  }

  .monto.ingreso {
    color: #059669;
    font-weight: 700;
  }

  .monto.gasto {
    color: #dc2626;
    font-weight: 700;
  }
</style>
