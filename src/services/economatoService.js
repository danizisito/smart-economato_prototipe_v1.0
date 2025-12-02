//const API_URL = 'https://my-json-server.typicode.com/tcasest/smart-economato-api'
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

// FUNCIÓN: Para añadir un producto vía POST
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