import { productos } from '../models/productos.js'
import { filtrarPorCategoria, buscarProductos } from '../utils/funciones.js'
import { renderizarTabla } from '../views/ui.js'

const acciones  = {
    btnBuscar: manejarBusqueda,
    btnFiltrarCategoria: manejarFiltro,
    btnOrdenar: manejarOrden,
    btnStock: manejarStock,
    btnMostrarTodos: manejarMostrarTodos,
};

controles.addEventListener('click', (e) => {
    const accion = acciones[e.tarjet.id];
    if(accion) accion();
})