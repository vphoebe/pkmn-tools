"use client"

import type PokeAPI from "pokedex-promise-v2"
import * as React from "react"

import type { PokemonData } from "../helpers/getPokemonData"
import { GenSelector } from "./GenSelector"
import { MoveTypesTable } from "./MoveTypesTable"
import { OpponentSection } from "./OpponentSection"

export interface MatchupsToolProps {
  pokemonData: PokemonData
  pokemonList: PokeAPI.NamedAPIResource[]
  allTypeData: PokeAPI.Type[]
}

export default function MatchupsTool({
  pokemonData,
  pokemonList,
  allTypeData,
}: MatchupsToolProps) {
  const [gen, setGen] = React.useState<number>(9)

  const introduced = pokemonData.introduced

  React.useEffect(() => {
    // if pokemon changes and gen is too low, fix it
    if (gen < introduced) {
      setGen(introduced)
    }
  }, [gen, introduced])

  return (
    <div className="max-w-sm mx-auto mt-8 px-4">
      <GenSelector gen={gen} setGen={setGen} introduced={introduced} />
      <OpponentSection
        gen={gen}
        pokemonData={pokemonData}
        pokemonList={pokemonList}
      />
      <MoveTypesTable
        gen={gen}
        pokemonData={pokemonData}
        allTypeData={allTypeData}
      />
    </div>
  )
}
