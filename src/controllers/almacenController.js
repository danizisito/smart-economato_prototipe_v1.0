import { getProducto, getCategoria } from "../services/economatoService.js";
import { filtrarPorCategoria, buscarProducto, ordenarPorPrecio } from "../utils/funciones.js";
import { renderizarTabla, renderizarCategorias } from "../views/economato-ui.js";

let productos = [];
let productosMostrados;
let categoriasMostradas;

export async function inicializar() {
    // Seleccionamos elementos **después de inyectar el HTML**
    const inputBusqueda = document.querySelector("#busqueda");
    const selectCategoria = document.querySelector("#categoriaSelect");
    const selectOrden = document.querySelector("#ordenSelect");

    const eventMap = [
        { selector: "#btnBuscar", event: "click", handler: onBuscar },
        { selector: "#ordenSelect", event: "change", handler: onOrdenar },
        { selector: "#btnMostrarTodos", event: "click", handler: onShowAll },
        { selector: "#categoriaSelect", event: "change", handler: onFiltrar },
    ];

    // Obtener productos y categorías
    productos = await getProducto();
    productosMostrados = productos;
    renderizarTabla(productosMostrados);

    categoriasMostradas = await getCategoria();
    renderizarCategorias(categoriasMostradas);

    // Funciones de búsqueda, filtro y orden
    function onBuscar() {
        const termino = inputBusqueda.value.trim();
        productosMostrados = buscarProducto(productos, termino);
        renderizarTabla(productosMostrados);
    }

    function onOrdenar() {
        const orden = selectOrden.value;
        productosMostrados = ordenarPorPrecio(productos, orden);
        renderizarTabla(productosMostrados);
    }

    async function onShowAll() {
        productosMostrados = await getProducto();
        inputBusqueda.value = "";
        selectCategoria.value = "";
        renderizarTabla(productosMostrados);
    }

    function onFiltrar() {
        const cat = selectCategoria.value;
        productosMostrados = cat ? filtrarPorCategoria(productos, cat) : [...productos];
        renderizarTabla(productosMostrados);
    }

    // Vincular eventos
    function bindEvents(events) {
        for (const { selector, event, handler } of events) {
            const el = document.querySelector(selector);
            if (el) el.addEventListener(event, handler);
        }
    }

    bindEvents(eventMap);
}
