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
    const tabla = document.querySelector("#tablaProductos");
    const controles = document.querySelector(".controles");

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

    // Cargar formulario de añadir producto en la misma página
    async function onAnadirProducto() {
        try {
            const response = await fetch("../templates/anadirProducto.html");
            if (!response.ok) throw new Error("No se pudo cargar el formulario");

            // Ocultar tabla y controles
            tabla.style.display = "none";
            controles.style.display = "none";

            // Insertar formulario
            formWrapper.innerHTML = await response.text();

            // Crear botón de volver
            const btnVolver = document.createElement("button");
            btnVolver.id = "btnVolver";
            btnVolver.textContent = "Volver al Inventario";
            btnVolver.style.margin = "15px auto";
            btnVolver.style.display = "block";
            formWrapper.prepend(btnVolver);

            // Volver a mostrar tabla y controles al hacer click
            btnVolver.addEventListener("click", () => {
                formWrapper.innerHTML = "";
                tabla.style.display = "";
                controles.style.display = "";
            });

        } catch (error) {
            formWrapper.innerHTML = `<p style="color:red">${error.message}</p>`;
        }
    }

    // Vincular eventos
    const eventMap = [
        { selector: "#btnBuscar", event: "click", handler: onBuscar },
        { selector: "#ordenSelect", event: "change", handler: onOrdenar },
        { selector: "#btnMostrarTodos", event: "click", handler: onShowAll },
        { selector: "#categoriaSelect", event: "change", handler: onFiltrar },
        { selector: "#btnAnadirProducto", event: "click", handler: onAnadirProducto },
    ];

    for (const { selector, event, handler } of eventMap) {
        const el = document.querySelector(selector);
        if (el) el.addEventListener(event, handler);
    }
}
