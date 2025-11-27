<script>
  import AbonoMetaForm from './AbonoMetaForm.svelte';
  import ProgressBar from './ProgressBar.svelte';

  // Simulación de metas — reemplázalo por fetch() cuando tengas API
  let metas = [
    { id: 1, nombre: "Comprar laptop", objetivo: 2000, ahorrado: 500 },
    { id: 2, nombre: "Viaje a México", objetivo: 1500, ahorrado: 300 },
    { id: 3, nombre: "Moto nueva", objetivo: 7000, ahorrado: 1000 },
  ];

  function getPorcentaje(meta) {
    if (!meta.objetivo || meta.objetivo === 0) return 0;
    return Math.min(100, (meta.ahorrado / meta.objetivo) * 100);
  }

  // opcional: callback para cuando se abona, por ejemplo para guardar en storage o API
  function handleAbono(meta, monto) {
    // ejemplo — aquí podrías llamar a una API para persistir:
    // await fetch('/api/metas/abonar', { method:'POST', body:... })
    console.log(`Abonaste ${monto} a ${meta.nombre} (nuevo ahorrado: ${meta.ahorrado})`);
  }
</script>

<h2>Mis Metas</h2>

{#each metas as meta (meta.id)}
  <div class="meta-card">
    <div class="meta-head">
      <h3>{meta.nombre}</h3>
      <small>{getPorcentaje(meta).toFixed(1)}%</small>
    </div>

    <p><strong>Objetivo:</strong> ${meta.objetivo}</p>
    <p><strong>Ahorrado:</strong> ${meta.ahorrado}</p>

    <ProgressBar porcentaje={getPorcentaje(meta)} />

    <AbonoMetaForm {meta} onAbono={handleAbono} />
  </div>
{/each}

<style>
  h2 { margin-bottom: 1rem; }
  .meta-card {
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    margin-bottom: 12px;
    background: white;
  }
  .meta-head {
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  p { margin:6px 0; }
</style>
