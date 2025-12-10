const { Grid, html } = gridjs;

let productoGrid = null;

export function renderizarTabla(datos) {

  const tableContainer = document.querySelector("#tablaProductos");
  const resumen = document.querySelector("#resumen");

  // 🛠️ Destruir Grid.js si ya existe (para evitar errores al volver a la página)
  if (productoGrid) {
    productoGrid.destroy();
    productoGrid = null;
  }

  // Caso sin datos
  if (!datos || datos.length === 0) {
    tableContainer.innerHTML = `
      <p style="text-align:center;">No se encontraron productos</p>
    `;
    if (resumen) resumen.textContent = "";
    return;
  }

  // Preparar datos para Grid.js
  const mappedData = datos.map(p => [
    p.id,
    p.nombre,
    p.categoria?.nombre || p.categoriaId || "N/A",
    p.precio,
    p.stock,
    p.stockMinimo,
    p.proveedor?.nombre || p.proveedorId || "N/A",
    p.proveedor?.isla || "N/A"
  ]);

  // Columnas de Grid.js
  const columnsDefinition = [
    { name: "ID", width: "5%" },
    { name: "Nombre", width: "20%" },
    { name: "Categoría", width: "15%" },

    {
      name: "Precio (€)",
      width: "10%",
      sort: true,
      formatter: cell => Number(cell).toFixed(2)
    },

    {
      name: "Stock",
      width: "10%",
      sort: true,
      formatter: (cell, row) => {
        const stockMinimo = row.cells[5].data;
        const isLow = cell < stockMinimo;
        return html(`<span class="${isLow ? "alerta-cell" : ""}">${cell}</span>`);
      }
    },

    { name: "Stock Mínimo", width: "10%" },
    { name: "Proveedor", width: "15%" },
    { name: "Isla", width: "15%" }
  ];

  // Crear Grid.js SIEMPRE desde cero
  productoGrid = new Grid({
    columns: columnsDefinition,
    data: mappedData,

    // 🔍 Buscador traducido
    search: {
      enabled: true,
      placeholder: "Buscar producto..."
    },

    sort: true,

    pagination: {
      enabled: true,
      limit: 10,
      summary: true
    },

    // 🌍 Traducción completa al español
    language: {
      search: {
        placeholder: "Buscar producto..."
      },
      sort: {
        sortAsc: "Ordenar ascendente",
        sortDesc: "Ordenar descendente"
      },
      pagination: {
        previous: "Anterior",
        next: "Siguiente",
        showing: "Mostrando",
        results: "resultados",
        to: "a",
        of: "de"
      },
      loading: "Cargando…",
      noRecordsFound: "No se encontraron productos",
      error: "Ocurrió un error al cargar los datos"
    },

    // Estilos de tabla
    style: {
      table: { "min-width": "100%" },
      td: { "font-size": "14px", padding: "12px" }
    }
  }).render(tableContainer);

  // FIX opcional por si Grid.js ignora el placeholder al pintar
  setTimeout(() => {
    const input = document.querySelector(".gridjs-search-input");
    if (input) input.placeholder = "Buscar producto...";
  }, 50);

  // Actualizar resumen
  if (resumen) {
    resumen.textContent = `Productos mostrados: ${datos.length}`;
  }
}


// ===============================================
// SELECTORES PARA FORMULARIO DE AÑADIR PRODUCTO
// ===============================================

export function renderizarSelectoresFormulario(categorias, proveedores) {

  // Categorías
  const selectCategoriaForm = document.querySelector("#categoriaId");
  if (selectCategoriaForm) {
    selectCategoriaForm.innerHTML = '<option value="">-- Seleccione Categoría --</option>';
    categorias.forEach(c => {
      const option = document.createElement("option");
      option.value = c.id;
      option.textContent = c.nombre;
      selectCategoriaForm.appendChild(option);
    });
  }

  // Proveedores
  const selectProveedorForm = document.querySelector("#proveedorId");
  if (selectProveedorForm) {
    selectProveedorForm.innerHTML = '<option value="">-- Seleccione Proveedor --</option>';
    proveedores.forEach(p => {
      const option = document.createElement("option");
      option.value = p.id;
      option.textContent = p.nombre;
      selectProveedorForm.appendChild(option);
    });
  }
}
