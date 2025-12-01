<script>
  import { movimientos } from '../stores.js';
  import MetasView from '../metas/MetasView.svelte';

  // Totales derivados de movimientos
  $: totalIngresos = $movimientos
    .filter(m => m.tipo === 'ingreso')
    .reduce((sum, m) => sum + m.monto, 0);

  $: totalGastos = $movimientos
    .filter(m => m.tipo === 'gasto')
    .reduce((sum, m) => sum + m.monto, 0);

  $: saldo = totalIngresos - totalGastos;
</script>

<h2>Resumen General</h2>
<div class="resumen">
  <p><strong>Total Ingresos:</strong> {totalIngresos}</p>
  <p><strong>Total Gastos:</strong> {totalGastos}</p>
  <p><strong>Saldo:</strong> {saldo}</p>
</div>

<h2>Metas de Ahorro</h2>
<MetasView />

<style>
  h2 {
    margin-top: 20px;
  }

  .resumen {
    padding: 10px;
    background: #f7f7f7;
    border-radius: 8px;
    margin-bottom: 20px;
  }
</style>
