export async function getPokemonList(): Promise<
  { url: string; name: string }[]
> {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0"
  );
  const { results } = await res.json();
  return results;
}
