/* Filtra productos por ID de categoría.*/
export function filtrarPorCategoria(productos, categoriaId) {
  if (!categoriaId) {
    return productos; // Devuelve todos si el ID es nulo o 0
  }

  // El filtro busca el ID dentro del objeto 'categoria'
  return productos.filter(p => {
    let productoCategoriaId;

    // obtener el ID del objeto anidado (p.categoria.id)
    if (p.categoria && p.categoria.id) {
      productoCategoriaId = p.categoria.id;
    }

    return productoCategoriaId == categoriaId;
  });
}

/* Filtra productos por nombre.*/
export function buscarProducto(productos, nombre) {
  return productos.filter((p) =>
    p.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}

/* Ordena productos por precio.*/

export function ordenarPorPrecio(productos, orden) {
  const lista = [...productos];
  if (orden === "asc") return lista.sort((a, b) => a.precio - b.precio);
  else if (orden === "desc") return lista.sort((a, b) => b.precio - a.precio);
}

/* Filtra productos con stock bajo. */
export function comprobarStockMinimo(productos) {
  return productos.filter((p) => p.stock < p.stockMinimo);
}