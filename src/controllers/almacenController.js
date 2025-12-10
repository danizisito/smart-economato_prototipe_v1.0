import { getProducto, getCategoria, getProveedor, addProducto } from "../services/economatoService.js";
import { renderizarTabla, renderizarSelectoresFormulario } from "../views/economato-ui.js";

let productos = [];
let productosMostrados;
let categoriasMostradas;
let proveedoresData = [];

export async function inicializar() {

    const btnAnadir = document.querySelector("#btnAnadirProducto");
    const formWrapper = document.querySelector("#formWrapper");

    // Obtener datos iniciales
    productos = await getProducto();
    productosMostrados = [...productos];

    categoriasMostradas = await getCategoria();
    proveedoresData = await getProveedor();

    // Renderizar tabla de productos
    renderizarTabla(productosMostrados);

    // ----------------------------------------------------
    // FUNCIÓN PARA CARGAR FORMULARIO AÑADIR PRODUCTO
    // ----------------------------------------------------
    async function onAnadirProducto() {

        const tabla = document.querySelector("#tablaProductos");
        const controles = document.querySelector(".controles");

        tabla.style.display = "none";
        controles.style.display = "none";

        try {
            // ⭐ IMPORTANTE: Como index.html está en /templates, la ruta correcta es:
            const path = "./anadirProducto.html";

            const response = await fetch(path);
            if (!response.ok) throw new Error(`Página no encontrada: ${path}`);

            const html = await response.text();
            formWrapper.innerHTML = html;

            // Renderizar selectores del formulario
            renderizarSelectoresFormulario(categoriasMostradas, proveedoresData);

            // Asegurar que el formulario existe antes de usar addEventListener
            const form = document.querySelector("#formAnadirProducto");
            if (!form) throw new Error("formAnadirProducto no encontrado en el HTML cargado");

            // Evento submit
            form.addEventListener("submit", handleFormSubmit);

            // Botón volver
            const btnVolver = document.querySelector("#btnVolver");
            if (btnVolver) {
                btnVolver.addEventListener("click", () => {
                    formWrapper.innerHTML = "";
                    tabla.style.display = "";
                    controles.style.display = "";
                });
            }

        } catch (error) {
            formWrapper.innerHTML = `<p style="color:red">Error cargando formulario: ${error.message}</p>`;
        }
    }

    // ----------------------------------------------------
    // FUNCIÓN PARA ENVIAR PRODUCTO A LA API
    // ----------------------------------------------------
    async function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const productoData = {};

        // Asignar valores y convertir números correctamente
        for (const [key, value] of formData.entries()) {
            if (['precioProducto', 'stockProducto', 'stockMinimo', 'categoriaId', 'proveedorId'].includes(key)) {
                productoData[key] = value === "" ? null : parseFloat(value);
            } else {
                productoData[key] = value;
            }
        }

        // Crear objeto final que pide la API
        const nuevoProducto = {
            nombre: productoData.nombreProducto,
            precio: productoData.precioProducto,
            unidadMedida: productoData.unidadMedida,
            stock: productoData.stockProducto,
            stockMinimo: productoData.stockMinimo,
            categoriaId: parseInt(productoData.categoriaId),
            proveedorId: parseInt(productoData.proveedorId),
            marca: productoData.marcaProducto,
            codigoBarras: productoData.codigoBarras,
            fechaCaducidad: productoData.fechaCaducidad,
            alergenos: productoData.alergenos,
            descripcion: productoData.descripcionProducto,
            imagen: "default.jpg",
            activo: true
        };

        try {
            const productoGuardado = await addProducto(nuevoProducto);
            alert(`Producto "${productoGuardado.nombre}" añadido con éxito. ID: ${productoGuardado.id}`);

            // Volver a mostrar la tabla
            const tabla = document.querySelector("#tablaProductos");
            const controles = document.querySelector(".controles");

            formWrapper.innerHTML = "";
            tabla.style.display = "";
            controles.style.display = "";

            // Recargar productos y tabla
            productos = await getProducto();
            productosMostrados = [...productos];
            renderizarTabla(productosMostrados);

        } catch (error) {
            alert(`Error al guardar el producto: ${error.message}`);
        }
    }

    // ----------------------------------------------------
    // REGISTRO DE EVENTOS
    // ----------------------------------------------------
    function bindEvents(events) {
        for (const { selector, event, handler } of events) {
            const el = document.querySelector(selector);
            if (el) el.addEventListener(event, handler);
        }
    }

    const eventMap = [
        { selector: "#btnAnadirProducto", event: "click", handler: onAnadirProducto }
    ];

    bindEvents(eventMap);
}
