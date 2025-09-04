import PokeAPI from "pokedex-promise-v2";
import Pokedex from "pokedex-promise-v2";
import { parseGenFromApiUrl } from "./getTypeData";

export function getGenTypesFromPokemon(pokemon: PokeAPI.Pokemon, gen: number) {
  if (!pokemon.past_types.length) return pokemon.types;

  const pastTypes = pokemon.past_types.find((pt) => {
    const ptGen = parseGenFromApiUrl(pt.generation.url);
    return ptGen >= gen;
  });

  if (!pastTypes) return pokemon.types;
  return pastTypes.types;
}

export async function getPokemonData(name: string) {
  const P = new Pokedex();
  const data = await P.getPokemonByName(name);
  const { types, past_types, sprites } = data;

  return {
    name,
    types,
    past_types,
    spriteUrl:
      sprites.other["official-artwork"].front_default ?? sprites.front_default,
  };
}
