import { getProducto, updateStock } from "../services/economatoService.js";

let productosInventario = []; 
const CODIGO_DE_BARRAS_CODORNICES = "8410001000503"; 
let productosEnRecepcion = []; 

// Función para renderizar el resumen de lo que se ha recibido
function renderizarResumenRecepcion() {
    const resumenDiv = document.getElementById("resumenRecepcion");

    if (productosEnRecepcion.length === 0) {
        resumenDiv.innerHTML = "<p style='text-align:center;'>Escanea un producto para comenzar la recepción.</p>";
        return;
    }

    let html = `
        <table class="recepcion-summary">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Nuevo Stock</th>
                </tr>
            </thead>
            <tbody>
    `;

    productosEnRecepcion.forEach(item => {
        html += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${item.nuevoStock}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;
    resumenDiv.innerHTML = html;
}

export async function inicializarRecepcion() {
    productosInventario = await getProducto();

    const scanInput = document.getElementById("scanInput");
    const cantidadInput = document.getElementById("cantidadInput");
    const addStockBtn = document.getElementById("addStockBtn");
    const messageElement = document.getElementById("recepcionMessage");
    const menuToggle = document.getElementById("menuToggle"); // Referencia al toggle

    messageElement.textContent = "";
    renderizarResumenRecepcion(); 

    scanInput.focus();

    if (menuToggle) {
        menuToggle.style.display = ""; 
    }

    scanInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            manejarEntradaStock(scanInput.value, parseInt(cantidadInput.value));
            scanInput.value = "";
            cantidadInput.value = 1; 
            scanInput.focus();
        }
    });

    addStockBtn.addEventListener("click", () => {
        manejarEntradaStock(scanInput.value, parseInt(cantidadInput.value));
        scanInput.value = "";
        cantidadInput.value = 1;
        scanInput.focus();
    });

    async function manejarEntradaStock(codigo, cantidad) {
        if (!codigo || isNaN(cantidad) || cantidad <= 0) {
            messageElement.textContent = "Debes introducir un código y una cantidad válida.";
            messageElement.className = "message error";
            return;
        }
        
        let producto;

        if (String(codigo) === CODIGO_DE_BARRAS_CODORNICES) {
            producto = productosInventario.find(p => p.id === "50"); 
        } else {
            producto = productosInventario.find(p => p.id === String(codigo));
        }


        if (!producto) {
            messageElement.textContent = `Error: Producto con código ${codigo} no encontrado.`;
            messageElement.className = "message error";
            return;
        }

        const nuevoStock = producto.stock + cantidad;
        
        try {
            await updateStock(producto.id, nuevoStock);
            producto.stock = nuevoStock; 
            
            productosEnRecepcion.push({
                id: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                nuevoStock: nuevoStock
            });
            renderizarResumenRecepcion(); 

            messageElement.textContent = `✅ Añadido ${cantidad}x de ${producto.nombre}. Nuevo stock: ${nuevoStock}.`;
            messageElement.className = "message success";
            
        } catch (error) {
            messageElement.textContent = `Error al actualizar el stock: ${error.message}`;
            messageElement.className = "message error";
        }
    }
}