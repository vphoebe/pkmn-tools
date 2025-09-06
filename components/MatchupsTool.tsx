"use client"

import { parseAsInteger, useQueryState } from "nuqs"
import type PokeAPI from "pokedex-promise-v2"
import * as React from "react"

import type { PokemonData } from "../helpers/getPokemonData"
import { CURRENT_GEN, GenSelector } from "./GenSelector"
import { MoveTypesTable } from "./MoveTypesTable"
import { OpponentSection } from "./OpponentSection"
import ThemeSwitch from "./ThemeSwitch"

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
    <div className="mx-auto flex h-full max-w-sm flex-col justify-between px-4 py-8">
      <div>
        <GenSelector gen={gen} setGen={setGen} introduced={introduced} />
        <div className="flex flex-col gap-4">
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
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium italic">type matchup tool</span>
        <ThemeSwitch />
      </div>
    </div>
  )
}
