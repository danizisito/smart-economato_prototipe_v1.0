// Define la URL base del API. En un entorno real, esta URL sería dinámica.
const API_URL = 'http://localhost:3000'

export async function getProducto() {
  try {
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok)
      throw new Error("No se pudo obtener el Producto");
    return await response.json();

  } catch (error) {
    console.error(error)
    return []

  }
}

export async function getCategoria() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok)
      throw new Error("No se pudo obtener la Categoria");
    return await response.json();

  } catch (error) {
    console.error(error)
    return []

  }
}

export async function getProveedor() {
  try {
    const response = await fetch(`${API_URL}/proveedores`);
    if (!response.ok)
      throw new Error("No se pudo obtener la lista de Proveedores");
    return await response.json();

  } catch (error) {
    console.error(error)
    return []

  }
}

/**
 * Añade un nuevo producto a la base de datos (POST).
 * @param producto - Datos del nuevo producto.
 */
export async function addProducto(producto) {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      throw new Error(`Error al añadir producto: ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error en addProducto:", error);
    throw error;
  }
}

/**
 * Actualiza el stock de un producto existente (PATCH).
 * @param {string} id - ID del producto a actualizar.
 * @param {number} nuevoStock - Nuevo valor de stock.
 */
export async function updateStock(id, nuevoStock) {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock: nuevoStock }),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar stock del producto ${id}: ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error en updateStock:", error);
    throw error;
  }
}