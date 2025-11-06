export function renderizarTabla(datos) {
  const tabla = document.querySelector("#tablaProductos tbody");
  tabla.innerHTML = "";
  if (datos.length === 0) {
    tabla.innerHTML =
      '<tr><td colspan="8" style="text-align:center;">No se encontraron productos</td></tr>';
    resumen.textContent = "";
    return;
  }

  datos.forEach((p) => {
    const fila = document.createElement("tr");
    if (p.stock < p.stockMinimo) fila.classList.add("alerta");
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria.nombre}</td>
      <td>${p.precio.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>${p.stockMinimo}</td>
      <td>${p.proveedor.nombre}</td>
      <td>${p.proveedor.isla}</td>
    `;
    tabla.appendChild(fila);
  });

  const totalProductos = datos.length;
  const valorTotal = datos
    .reduce((acc, p) => acc + p.precio * p.stock, 0)
    .toFixed(2);
  resumen.textContent = `Productos mostrados: ${totalProductos} | Valor total del stock: ${valorTotal} €`;
}

/*export function renderizarCategorias(datos) {
  const select = document.querySelector("#categoriaSelect");
  select.innerHTML = "";
  if(datos ===  0){
    select.innerHTML =  `
      <option value="">-- Categoría --</option>
    `
    return;
  }
    
  datos.forEach((c) => { 
    const selector = document.createElement("option");
    selector.innerHTML = `
    <option value="${c.nombre}">${c.nombre}</option>
    `
    select.appendChild(selector);
  })
  
}*/


export function renderizarCategorias(categorias) {
  const select = document.querySelector("#categoriaSelect");
  //Podemos limpiar opciones previas
  select.textContent = '';

  //Vamos a crear la opción por defecto
  const opcionDefault = document.createElement("option");
  opcionDefault.value = ''
  opcionDefault.textContent = "--- Categoria ---";
  select.appendChild(opcionDefault);
    
  //Recorrer categorias y crear o modificar el DOM
  categorias.forEach((c) => {
    const option = document.createElement('option');
    option.value = c.nombre;
    option.textContent = c.nombre;
    select.appendChild(option);
  })
  
}

