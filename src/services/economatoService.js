async function getProducto(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) throw new Error("No se pudo obtener el Pokémon");
  return await response.json();
}
