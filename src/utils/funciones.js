export function filtrarPorCategoria(productos, cat) {
  return productos.filter((p) => p.categoria.nombre === cat);
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
