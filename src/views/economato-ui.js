const { Grid } = gridjs;

let productoGrid = null;
let observer = null; // Variable para controlar el observador

/**
 * Renderiza la tabla de productos utilizando Grid.js.
 * @param {Array} datos - Lista de productos a mostrar.
 */
export function renderizarTabla(datos) {

    const tableContainer = document.querySelector("#tablaProductos");
    const resumen = document.querySelector("#resumen");

    // Limpieza previa
    if (productoGrid) {
        productoGrid.destroy();
        productoGrid = null;
    }

    // Si ya había un observador funcionando, lo desconectamos para no duplicar
    if (observer) {
        observer.disconnect();
        observer = null;
    }

    if (!datos || datos.length === 0) {
        // CORRECCIÓN FASE 3: Añadido role="alert" para anunciar el estado vacío
        tableContainer.innerHTML =
            "<p style='text-align:center;' role='alert'>No hay productos disponibles actualmente.</p>";
        resumen.textContent = "";
        return;
    }

    const mapped = datos.map(p => [
        p.id,
        p.nombre,
        p.categoria?.nombre || "Sin categoría",
        p.precio?.toFixed(2) || "0.00",
        p.stock,
        p.stockMinimo,
        p.proveedor?.nombre || "Sin proveedor",
        p.proveedor?.isla || "N/A"
    ]);

    productoGrid = new Grid({
        columns: [
            { id: 'id', name: "ID", width: '50px' },
            { id: 'nombre', name: "Nombre", width: '200px' },
            { id: 'categoria', name: "Categoría", width: '150px' },
            { id: 'precio', name: "Precio (€)", width: '100px' },
            { id: 'stock', name: "Stock", width: '80px' },
            { id: 'stockMinimo', name: "Stock Mínimo", width: '120px' },
            { id: 'proveedor', name: "Proveedor", width: '250px' },
            { id: 'isla', name: "Isla", width: '120px' }
        ],
        data: mapped,
        search: false,
        sort: true,
        pagination: {
            limit: 10,
            summary: false // Ocultamos el resumen default para evitar duplicidad si quieres
        },
        language: {
            'pagination': {
                'previous': 'Anterior',
                'next': 'Siguiente'
            }
        }
    }).render(tableContainer);

    resumen.textContent = `Productos mostrados: ${datos.length}`;

    // --- PARCHE DE ACCESIBILIDAD PARA WAVE (0 ALERTAS) ---
    // Esto vigila si GridJS añade botones con 'title' redundante y los elimina al instante.

    const removeRedundantTitles = () => {
        const buttons = tableContainer.querySelectorAll('.gridjs-pages button');
        buttons.forEach(btn => {
            if (btn.hasAttribute('title')) {
                btn.removeAttribute('title');
            }
        });
    };

    // Crear un observador que vigila cambios en el HTML de la tabla
    observer = new MutationObserver((mutations) => {
        removeRedundantTitles();
    });

    // Empezar a observar el contenedor de la tabla
    observer.observe(tableContainer, {
        childList: true,
        subtree: true
    });

    // Ejecutar una vez al inicio por si acaso
    setTimeout(removeRedundantTitles, 500);
}

/** Rellena los selectores de Categoría y Proveedor en el formulario.*/
export function renderizarSelectoresFormulario(categorias, proveedores) {
    const cat = document.querySelector("#categoriaId");
    const prov = document.querySelector("#proveedorId");

    if (!cat || !prov) return; // Seguridad por si no existen en el DOM

    cat.innerHTML = "<option value=''>Seleccione categoría</option>";
    categorias.forEach(c => {
        cat.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
    });

    prov.innerHTML = "<option value=''>Seleccione proveedor</option>";
    proveedores.forEach(p => {
        prov.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
    });
}