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
import Spinner from "./Spinner"

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
  const [value, setValue] = React.useState(pokemonData.name)
  const [query, setQuery] = React.useState("")
  const [isPending, startTransition] = React.useTransition()

  const filteredPokemon = React.useMemo(
    () =>
      query.length > 1
        ? options.filter((p) => {
            return p.toLowerCase().includes(query.toLowerCase())
          })
        : [],
    [options, query],
  )

  const changePokemon = (newPokemonName: string) => {
    setValue(newPokemonName)
    startTransition(() =>
      router.push(`${newPokemonName}?${searchParams.toString()}`),
    )
  }

  return (
    <Combobox
      value={value}
      onChange={(val) => (val ? changePokemon(val) : undefined)}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          aria-label="Assignee"
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 rounded-sm border bg-white px-2 py-2 dark:bg-zinc-400 dark:text-black"
          onFocus={(e) => e.currentTarget.select()}
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        {isPending && (
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <Spinner />
          </div>
        )}
      </div>
      <ComboboxOptions
        anchor={{ to: "bottom" }}
        className="w-(--input-width) rounded-sm border empty:invisible dark:text-black"
      >
        {filteredPokemon.map((p) => (
          <ComboboxOption
            key={p}
            value={p}
            className="gap-2 bg-white p-2 data-focus:bg-blue-100"
          >
            {p}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}
