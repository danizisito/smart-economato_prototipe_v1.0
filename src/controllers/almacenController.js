import {
    getProducto,
    getCategoria,
    getProveedor,
    addProducto
} from "../services/economatoService.js";

import {
    renderizarTabla,
    renderizarSelectoresFormulario
} from "../views/economato-ui.js";

let productos = [];
let productosMostrados = [];
let categoriasMostradas = [];
let proveedoresData = [];

// FUNCIÓN PARA VOLVER A LA VISTA DE TABLA
function volverAVistaTabla() {
    const wrapper = document.querySelector(".economato-wrapper");
    const formWrapper = document.querySelector("#formWrapper");
    const tabla = document.querySelector("#tablaProductos");
    const controles = document.querySelector(".controles");
    const tituloPrincipal = document.querySelector(".eco-title");
    const resumen = document.querySelector("#resumen");
    const menuToggle = document.getElementById("menuToggle");

    wrapper.classList.remove("form-anadir");
    formWrapper.innerHTML = "";

    // MOSTRAR ELEMENTOS DE LA VISTA DE TABLA
    tituloPrincipal.style.display = "";
    resumen.style.display = "";
    tabla.style.display = "";
    controles.style.display = "";

    if (menuToggle) menuToggle.style.display = "";

    const btnAnadir = document.querySelector("#btnAnadirProducto");
    if (btnAnadir) btnAnadir.focus();
}


function dispararRecargaInventario() {
    const inventarioLink = document.querySelector('.navBar a[data-page="economato"]');

    if (inventarioLink) {
        inventarioLink.click();
    } else {
        volverAVistaTabla();
    }
}


/* INICIALIZACIÓN */
export async function inicializar() {

    const btnBuscar = document.querySelector("#btnBuscar");
    const inputBuscar = document.querySelector("#busqueda");

    const btnAnadir = document.querySelector("#btnAnadirProducto");
    const formWrapper = document.querySelector("#formWrapper");
    const wrapper = document.querySelector(".economato-wrapper");

    const tituloPrincipal = document.querySelector(".eco-title");
    const resumen = document.querySelector("#resumen");
    const menuToggle = document.getElementById("menuToggle");

    // Cargar datos iniciales
    productos = await getProducto();
    productosMostrados = [...productos];

    categoriasMostradas = await getCategoria();
    proveedoresData = await getProveedor();

    renderizarTabla(productosMostrados);

    if (menuToggle) {
        menuToggle.style.display = "";
    }

    /* BUSCADOR EN TIEMPO REAL */
    inputBuscar?.addEventListener("input", () => {
        buscar(inputBuscar.value);
    });

    btnBuscar?.addEventListener("click", () => {
        buscar(inputBuscar.value);
    });

    function buscar(texto) {
        texto = texto.toLowerCase().trim();

        productosMostrados = productos.filter(p =>
            p.nombre?.toLowerCase().includes(texto) ||
            p.categoria?.nombre?.toLowerCase().includes(texto) ||
            p.proveedor?.nombre?.toLowerCase().includes(texto)
        );

        renderizarTabla(productosMostrados);
    }

    /* ABRIR FORMULARIO DE AÑADIR PRODUCTO */
    btnAnadir.addEventListener("click", async () => {

        const tabla = document.querySelector("#tablaProductos");
        const controles = document.querySelector(".controles");

        tituloPrincipal.style.display = "none";
        resumen.style.display = "none";
        tabla.style.display = "none";
        controles.style.display = "none";

        const response = await fetch("./anadirProducto.html");
        const html = await response.text();

        formWrapper.innerHTML = html;

        wrapper.classList.add("form-anadir");

        renderizarSelectoresFormulario(categoriasMostradas, proveedoresData);

        // Mover el foco al nuevo título h2 para anunciar cambio de contexto
        const nuevoTitulo = formWrapper.querySelector("h2");
        if (nuevoTitulo) {
            nuevoTitulo.setAttribute("tabindex", "-1");
            nuevoTitulo.focus();
        }

        const form = document.querySelector("#formAnadirProducto");
        form.addEventListener("submit", handleFormSubmit);

        document.querySelector("#btnVolver").addEventListener("click", volverAVistaTabla);
    });
}

/* GUARDAR PRODUCTO NUEVO */
async function handleFormSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const nuevoId = Math.max(...productos.map(p => parseInt(p.id))) + 1;

    const categoriaSeleccionada =
        categoriasMostradas.find(c => c.id == data.get("categoriaId"));
    const proveedorSeleccionado =
        proveedoresData.find(p => p.id == data.get("proveedorId"));

    const nuevoProducto = {
        id: nuevoId.toString(),
        nombre: data.get("nombreProducto"),
        marca: data.get("marcaProducto"),
        unidadMedida: data.get("unidadMedida"),
        precio: parseFloat(data.get("precioProducto")),
        stock: parseInt(data.get("stockProducto")),
        stockMinimo: parseInt(data.get("stockMinimo")),
        categoriaId: parseInt(data.get("categoriaId")),
        proveedorId: parseInt(data.get("proveedorId")),
        codigoBarras: data.get("codigoBarras"),
        fechaCaducidad: data.get("fechaCaducidad"),
        alergenos: data.get("alergenos") || "",
        descripcion: data.get("descripcionProducto") || "",
        activo: true,

        categoria: {
            id: categoriaSeleccionada?.id || null,
            nombre: categoriaSeleccionada?.nombre || "Sin categoría",
        },
        proveedor: {
            id: proveedorSeleccionado?.id || null,
            nombre: proveedorSeleccionado?.nombre || "Sin proveedor",
        }
    };

    try {
        await addProducto(nuevoProducto);
        alert("Producto añadido correctamente. Recargando inventario...");
    } catch (error) {
        alert("Error al guardar el producto. Inténtalo de nuevo.");
        console.error(error);
        return;
    }

    dispararRecargaInventario();
}