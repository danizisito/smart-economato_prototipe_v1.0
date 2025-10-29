export function filtrarPorCategoria(productos, categoria) {
  return productos.filter((p=> p.categoria.nombre === categoria))
}

export function buscarProducto(productos, nombre) {
  return productos.filter((p => p.nombre.toLowerCase().includes(nombre.toLowerCase())));
}

export function ordenarPorPrecio(productos,orden) {
  const ordenadosPorPrecio = [...productos];
  if(orden === 'asc'){
    return ordenadosPorPrecio.sort((a, b) => a.precio - b.precio);
  }else{
    return ordenadosPorPrecio.sort((a, b) => b.precio - a.precio);
  }
}

export function comprobarStockMinimo(productos) {
  return productos.filter((p => p.stock < p.stockMinimo))
}