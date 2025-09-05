import type PokeAPI from "pokedex-promise-v2"
import Pokedex from "pokedex-promise-v2"

import { parseGenFromApiUrl } from "./getTypeData"

export type PokemonData = Pick<
  PokeAPI.Pokemon,
  "name" | "types" | "past_types" | "sprites"
> & { introduced: number }

export function getGenTypesFromPokemon(pokemon: PokemonData, gen: number) {
  if (!pokemon.past_types.length) return pokemon.types

  const pastTypes = pokemon.past_types.find((pt) => {
    const ptGen = parseGenFromApiUrl(pt.generation.url)
    return ptGen >= gen
  })

  if (!pastTypes) return pokemon.types
  return pastTypes.types
}

export async function getPokemonData(name: string): Promise<PokemonData> {
  const P = new Pokedex()
  const data = await P.getPokemonByName(name)
  const species = await P.getPokemonSpeciesByName(name)
  const { types, past_types, sprites } = data

  const introduced = parseGenFromApiUrl(species.generation.url)

  return {
    name,
    types,
    past_types,
    sprites,
    introduced,
  }
}

export function getGenSprite(gen: number, sprites: PokeAPI.PokemonSprites) {
  const v = sprites.versions
  const propertyName = "front_default"
  switch (gen) {
    case 5:
      return v["generation-v"]["black-white"][propertyName]
    case 4:
      return v["generation-iv"].platinum[propertyName]
    case 3:
      return v["generation-iii"].emerald[propertyName]
    case 2:
      return v["generation-ii"].crystal[propertyName]
    case 1:
      return v["generation-i"]["red-blue"][propertyName]
    default:
      return sprites.other["official-artwork"][propertyName]
  }
}
