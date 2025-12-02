import { getProducto, getCategoria, getProveedor, addProducto } from "../services/economatoService.js";
import { filtrarPorCategoria, buscarProducto, ordenarPorPrecio } from "../utils/funciones.js";
import { renderizarTabla, renderizarCategorias, renderizarSelectoresFormulario } from "../views/economato-ui.js";

let productos = [];
let productosMostrados;
let categoriasMostradas;
let proveedoresData = [];

export async function inicializar() {
    const inputBusqueda = document.querySelector("#busqueda");
    const selectCategoria = document.querySelector("#categoriaSelect");
    const selectOrden = document.querySelector("#ordenSelect");
    const btnAnadir = document.querySelector("#btnAnadirProducto");
    const formWrapper = document.querySelector("#formWrapper");

    // Obtener productos y categorías (para la tabla y filtros)
    productos = await getProducto();
    productosMostrados = [...productos];
    renderizarTabla(productosMostrados);

    categoriasMostradas = await getCategoria();
    renderizarCategorias(categoriasMostradas);

    // OBTENER PROVEEDORES (Para el formulario)
    proveedoresData = await getProveedor();

    // Funciones de búsqueda, filtro y orden... (sin cambios)
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
        const tabla = document.querySelector("#tablaProductos");
        const controles = document.querySelector(".controles");

        // Ocultar tabla y controles
        tabla.style.display = "none";
        controles.style.display = "none";

        try {
            const response = await fetch("../templates/anadirProducto.html");
            if (!response.ok) throw new Error("Página no encontrada");

            formWrapper.innerHTML = await response.text();

            // Renderizar Categorías y Proveedores
            renderizarSelectoresFormulario(categoriasMostradas, proveedoresData);

            // *********************************************************
            // NUEVO: MANEJO DEL SUBMIT DEL FORMULARIO
            // *********************************************************
            const form = document.querySelector("#formAnadirProducto");
            form.addEventListener("submit", handleFormSubmit);

            // Inicializar botón "Volver"
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

    // NUEVA FUNCIÓN: Recoge datos y envía a la API
    async function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const productoData = {};

        // Recoger todos los campos del formulario
        for (const [key, value] of formData.entries()) {
            // Convertir números donde sea necesario
            if (['precioProducto', 'precioUnitario', 'stockProducto', 'stockMinimo', 'categoriaId', 'proveedorId'].includes(key)) {
                productoData[key] = parseFloat(value) || parseInt(value) || value;
            } else {
                productoData[key] = value;
            }
        }

        // Mapear los campos del formulario a la estructura final del producto
        const nuevoProducto = {
            nombre: productoData.nombreProducto,
            precio: productoData.precioProducto,
            precioUnitario: productoData.unidadMedida, // Usamos unidadMedida como precioUnitario
            stock: productoData.stockProducto,
            stockMinimo: productoData.stockMinimo,
            categoriaId: parseInt(productoData.categoriaId),
            proveedorId: parseInt(productoData.proveedorId),
            unidadMedida: productoData.unidadMedida,
            marca: productoData.marcaProducto,
            codigoBarras: productoData.codigoBarras,
            fechaCaducidad: productoData.fechaCaducidad,
            alergenos: productoData.alergenos.split(',').map(a => a.trim()),
            descripcion: productoData.descripcionProducto,
            // Campos por defecto que podría necesitar el modelo (ajustar según tu JSON Server)
            imagen: "default.jpg",
            activo: true
        };

        try {
            const productoGuardado = await addProducto(nuevoProducto);
            alert(`Producto "${productoGuardado.nombre}" añadido con éxito! ID: ${productoGuardado.id}`);

            // Opcional: Recargar la tabla principal (economato) para ver el nuevo producto
            const tabla = document.querySelector("#tablaProductos");
            const controles = document.querySelector(".controles");
            const formWrapper = document.querySelector("#formWrapper");

            // Ocultar formulario
            formWrapper.innerHTML = "";
            tabla.style.display = "";
            controles.style.display = "";

            // Recargar datos y renderizar
            productos = await getProducto();
            productosMostrados = [...productos];
            renderizarTabla(productosMostrados);

        } catch (error) {
            alert(`Error al guardar el producto: ${error.message}`);
        }
    }
    // ... (El resto de bindEvents)

    // Vincular eventos
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