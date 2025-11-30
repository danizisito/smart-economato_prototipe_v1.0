import { getProducto, getCategoria } from "../services/economatoService.js";
import { filtrarPorCategoria, buscarProducto, ordenarPorPrecio } from "../utils/funciones.js";
import { renderizarTabla, renderizarCategorias } from "../views/economato-ui.js";

let productos = [];
let productosMostrados;
let categoriasMostradas;

export async function inicializar() {
    const inputBusqueda = document.querySelector("#busqueda");
    const selectCategoria = document.querySelector("#categoriaSelect");
    const selectOrden = document.querySelector("#ordenSelect");
    const btnAnadir = document.querySelector("#btnAnadirProducto");
    const formWrapper = document.querySelector("#formWrapper");

    // Obtener productos y categorías
    productos = await getProducto();
    productosMostrados = [...productos];
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

    async function onAnadirProducto() {
        const tabla = document.querySelector("#tablaProductos");
        const controles = document.querySelector(".controles");

        tabla.style.display = "none";
        controles.style.display = "none";

        try {
            const response = await fetch("../templates/anadirProducto.html");
            if (!response.ok) throw new Error("Página no encontrada");
            
            formWrapper.innerHTML = await response.text();

            // Aplicar grid de 4 columnas
            const formContainer = document.querySelector(".form-container-wrapper");
            if (formContainer) {
                formContainer.style.display = 'grid';
                formContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
                formContainer.style.gap = '20px'; 
            }

            const btnVolver = document.querySelector("#btnVolver");
            btnVolver.addEventListener("click", () => {
                formWrapper.innerHTML = "";
                tabla.style.display = "";
                controles.style.display = "";
            });

        } catch (error) {
            formWrapper.innerHTML = `<p style="color:red">${error.message}</p>`;
        }
    }

    function bindEvents(events) {
        for (const { selector, event, handler } of events) {
            const el = document.querySelector(selector);
            if (el) el.addEventListener(event, handler);
        }
    }

    const eventMap = [
        { selector: "#btnBuscar", event: "click", handler: onBuscar },
        { selector: "#ordenSelect", event: "change", handler: onOrdenar },
        { selector: "#btnMostrarTodos", event: "click", handler: onShowAll },
        { selector: "#categoriaSelect", event: "change", handler: onFiltrar },
        { selector: "#btnAnadirProducto", event: "click", handler: onAnadirProducto },
    ];

    bindEvents(eventMap);
}
