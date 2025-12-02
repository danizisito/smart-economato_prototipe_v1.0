export function renderizarTabla(datos) {
  const tabla = document.querySelector("#tablaProductos tbody");
  const resumen = document.querySelector("#resumen");

  tabla.innerHTML = "";
  if (datos.length === 0) {
    tabla.innerHTML =
      '<tr><td colspan="8" style="text-align:center;">No se encontraron productos</td></tr>';
    if (resumen) resumen.textContent = "";
    return;
  }

  datos.forEach((p) => {
    const fila = document.createElement("tr");

    // LÓGICA DE ALERTA: Aplica la clase 'alerta' si el stock es bajo
    if (p.stock < p.stockMinimo) {
      fila.classList.add("alerta");
    }

    // Manejo de "undefined" para evitar errores en las columnas
    const categoriaNombre = p.categoria ? p.categoria.nombre : (p.categoriaId || 'N/A');
    const proveedorNombre = p.proveedor ? p.proveedor.nombre : (p.proveedorId || 'N/A');
    const proveedorIsla = p.proveedor ? p.proveedor.isla : 'N/A';

    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${categoriaNombre}</td>
      <td>${p.precio.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>${p.stockMinimo}</td>
      <td>${proveedorNombre}</td>
      <td>${proveedorIsla}</td>
    `;
    tabla.appendChild(fila);
  });

  const totalProductos = datos.length;
  const valorTotal = datos
    .reduce((acc, p) => acc + p.precio * p.stock, 0)
    .toFixed(2);

  if (resumen) resumen.textContent = `Productos mostrados: ${totalProductos} | Valor total del stock: ${valorTotal} €`;
}


export function renderizarCategorias(categorias) {
  const select = document.querySelector("#categoriaSelect");
  // Esta función renderiza el selector de filtro en economato.html, no el del formulario.
  // Pero la adaptaremos a renderizar el del formulario después. 

  select.textContent = '';

  const opcionDefault = document.createElement("option");
  opcionDefault.value = ''
  opcionDefault.textContent = "--- Categoria ---";
  select.appendChild(opcionDefault);

  categorias.forEach((c) => {
    const option = document.createElement('option');
    option.value = c.nombre;
    option.textContent = c.nombre;
    select.appendChild(option);
  })
}

// NUEVA FUNCIÓN: Renderizar selectores en el formulario (basado en el ID)
export function renderizarSelectoresFormulario(categorias, proveedores) {
  // 1. Renderizar Categorías en el formulario
  const selectCategoriaForm = document.querySelector("#categoriaId");
  if (selectCategoriaForm) {
    selectCategoriaForm.innerHTML = '<option value="">-- Seleccione Categoría --</option>';
    categorias.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id; // Usar el ID como valor
      option.textContent = c.nombre;
      selectCategoriaForm.appendChild(option);
    });
  }

  // 2. Renderizar Proveedores en el formulario
  const selectProveedorForm = document.querySelector("#proveedorId");
  if (selectProveedorForm) {
    selectProveedorForm.innerHTML = '<option value="">-- Seleccione Proveedor --</option>';
    proveedores.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id; // Usar el ID como valor
      option.textContent = p.nombre;
      selectProveedorForm.appendChild(option);
    });
  }
}