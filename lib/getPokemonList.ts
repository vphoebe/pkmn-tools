export interface PokemonListItem {
  url: string;
  name: string;
}

export async function getPokemonList(): Promise<PokemonListItem[]> {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0"
  );
  const { results } = await res.json();
  return results;
}
