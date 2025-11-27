<script>
  // Recibimos el porcentaje desde el componente padre
  export let porcentaje = 0;

  // Aseguramos que el porcentaje sea un número válido entre 0 y 100
  $: pct = Math.max(0, Math.min(100, Number(porcentaje) || 0));
</script>

<div class="barra">
  <!-- Barra de progreso -->
  <div class="progreso" style="width: {pct + '%'}"></div>
</div>

<style>
  .barra {
    width: 100%;
    height: 12px;
    background: #eee;
    border-radius: 8px;
    overflow: hidden;
  }

  .progreso {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #66bb6a);
    border-radius: 8px 0 0 8px;
    transition: width 0.3s ease;
  }
</style>

