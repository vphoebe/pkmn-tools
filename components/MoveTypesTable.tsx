import type PokeAPI from "pokedex-promise-v2"
import * as React from "react"

import { backgroundColors } from "../helpers/colors"
import type { PokemonData } from "../helpers/getPokemonData"
import { getGenTypesFromPokemon } from "../helpers/getPokemonData"
import { getTypeDataForGen } from "../helpers/getTypeData"
import { getMultiplier, valueColorMap } from "../helpers/multiplier"

interface MoveTypesTableProps {
  gen: number
  pokemonData: PokemonData
  allTypeData: PokeAPI.Type[]
}

function MultiplierCell({ value }: { value: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-r-sm p-1 text-sm ring ${valueColorMap[value]}`}
    >
      <span className="font-mono">
        {" "}
        {value === 0
          ? "0"
          : value === 0.5
            ? "½"
            : value === 0.25
              ? "¼"
              : value.toString()}
        X
      </span>
    </div>
  )
}

function AttackPill({
  attackName,
  multiplier,
}: {
  attackName: string
  multiplier: number
}) {
  return multiplier !== 1 ? (
    <div className="flex align-middle">
      <div
        key={`${attackName}-row`}
        className={`${backgroundColors[attackName]} flex items-center rounded-l-sm px-2 py-1 font-mono text-xs font-medium uppercase ring`}
      >
        {attackName}
      </div>
      <MultiplierCell key={`${attackName}-cell`} value={multiplier} />
    </div>
  ) : null
}

function EffectiveGroup({ heading, rows }) {
  return (
    <div className="flex flex-col gap-2 px-2 pt-2 pb-4 first:rounded-t-md first:bg-green-50 last:rounded-b-md last:border-t last:bg-red-50 dark:first:bg-green-950/25 last:dark:border-zinc-500 dark:last:bg-red-950/25">
      <div className="text-center font-medium italic">{heading}</div>
      <div className="flex flex-wrap justify-center gap-3 dark:text-black">
        {rows.map((row) => (
          <AttackPill key={row.attackName} {...row} />
        ))}
      </div>
    </div>
  )
}

export function MoveTypesTable({
  gen,
  pokemonData,
  allTypeData,
}: MoveTypesTableProps) {
  const typeData = getTypeDataForGen(allTypeData, gen)
  const typeList = typeData.map((d) => d.name)
  const defenseTypes = getGenTypesFromPokemon(pokemonData, gen).map(
    (t) => t.type.name,
  )

  const values = typeList.map((attackName) => {
    const multiplier = getMultiplier(typeData, attackName, defenseTypes)
    return { attackName, multiplier }
  })

  const positiveRows = values
    .filter((row) => row.multiplier > 1)
    .sort((a, b) => b.multiplier - a.multiplier)

  const negativeRows = values
    .filter((row) => row.multiplier < 1)
    .sort((a, b) => a.multiplier - b.multiplier)

  return defenseTypes[0] !== "none" ? (
    <div className="flex flex-col rounded-md border bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-900">
      <EffectiveGroup heading="super effective" rows={positiveRows} />
      <EffectiveGroup heading="not effective" rows={negativeRows} />
    </div>
  ) : null
}
