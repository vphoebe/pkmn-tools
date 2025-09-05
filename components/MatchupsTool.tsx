"use client"

import { parseAsInteger, useQueryState } from "nuqs"
import type PokeAPI from "pokedex-promise-v2"
import * as React from "react"

import type { PokemonData } from "../helpers/getPokemonData"
import { CURRENT_GEN, GenSelector } from "./GenSelector"
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
  const [gen, setGen] = useQueryState(
    "gen",
    parseAsInteger.withDefault(CURRENT_GEN),
  )

  const introduced = pokemonData.introduced

  React.useEffect(() => {
    if (gen < introduced) {
      setGen(introduced)
    }
  }, [gen, introduced, setGen])

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
