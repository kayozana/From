<script>
  import MetasList from "./meta_list.svelte"; // ✔ el archivo debe llamarse igual

  let metas = [
    { id: 1, nombre: "Moto", objetivo: 2000, ahorrado: 500 },
    { id: 2, nombre: "Viaje", objetivo: 3000, ahorrado: 1200 },
    { id: 3, nombre: "PC Gamer", objetivo: 2500, ahorrado: 400 }
  ];

  function abonarMeta(id, monto) {
    metas = metas.map(m =>
      m.id === id ? { ...m, ahorrado: m.ahorrado + monto } : m
    );
  }
</script>

<h2>Mis Metas</h2>

<MetasList {metas} onAbonar={abonarMeta}></MetasList>
