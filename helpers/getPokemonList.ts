import Pokedex from "pokedex-promise-v2";

export async function getPokemonList() {
  const P = new Pokedex();
  return (await P.getPokemonsList()).results;
}
