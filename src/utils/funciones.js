export function filtrarPorCategoria(productos, categoriaId) {
  if (!categoriaId) {
    return productos; // Devuelve todos si el ID es nulo o 0
  }

  // El filtro busca el ID dentro del objeto 'categoria'
  return productos.filter(p => {
    let productoCategoriaId;

    // Intentamos obtener el ID del objeto anidado (p.categoria.id)
    // Usamos la comprobación de existencia para evitar errores si 'categoria' no existe
    if (p.categoria && p.categoria.id) {
      productoCategoriaId = p.categoria.id;
    }

    // Usamos el operador de igualdad flexible (==) para que funcione con cualquier tipo de dato (string/number)
    return productoCategoriaId == categoriaId;
  });
}

export function buscarProducto(productos, nombre) {
  return productos.filter((p) =>
    p.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}

export function ordenarPorPrecio(productos, orden) {
  const lista = [...productos];
  if (orden === "asc") return lista.sort((a, b) => a.precio - b.precio);
  else if (orden === "desc") return lista.sort((a, b) => b.precio - a.precio);
}

export function comprobarStockMinimo(productos) {
  return productos.filter((p) => p.stock < p.stockMinimo);
}