"use client"

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react"
import { useRouter, useSearchParams } from "next/navigation"
import type PokeAPI from "pokedex-promise-v2"
import React from "react"

import type { PokemonData } from "../helpers/getPokemonData"

export default function PokemonSelector({
  pokemonList,
  pokemonData,
}: {
  pokemonList: PokeAPI.NamedAPIResource[]
  pokemonData: PokemonData
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const options = pokemonList.map((p) => p.name)
  const [query, setQuery] = React.useState("")

  const filteredPokemon = React.useMemo(
    () =>
      query.length > 2
        ? options.filter((p) => {
            return p.toLowerCase().includes(query.toLowerCase())
          })
        : [],
    [options, query],
  )

  const updatePokemon = (pokemon: string) => {
    router.push(`${pokemon}?${searchParams.toString()}`)
  }

  return (
    <Combobox
      value={pokemonData.name}
      onChange={(val) => (val ? updatePokemon(val) : undefined)}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(p) => p as string}
        onChange={(event) => setQuery(event.target.value)}
        className="flex-1 h-full px-2 rounded-sm border bg-white"
      />
      <ComboboxOptions
        anchor={{ to: "bottom" }}
        className="w-(--input-width) border rounded-sm empty:invisible"
      >
        {filteredPokemon.map((p) => (
          <ComboboxOption
            key={p}
            value={p}
            className="p-2 gap-2 bg-white data-focus:bg-blue-100"
          >
            {p}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}
