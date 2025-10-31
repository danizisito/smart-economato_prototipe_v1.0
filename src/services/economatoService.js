const API_URL = 'https://my-json-server.typicode.com/tcasest/smart-economato-api'
//const API_URL = 'http//localhost:3000'

export async function getProducto() {
  try{
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok) 
      throw new Error("No se pudo obtener el Pokémon");
    return await response.json();

  }catch(error){
    console.error(error)
    return []

  }
}

export async function getCategoria() {
  try{
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok) 
      throw new Error("No se pudo obtener el Pokémon");
    return await response.json();

  }catch(error){
    console.error(error)
    return []

  }
}