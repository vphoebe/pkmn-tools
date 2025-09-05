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
      className={`flex flex-1 p-1 rounded-r-sm ring items-center text-center ${valueColorMap[value]}`}
    >
      {value === 0
        ? "0"
        : value === 0.5
          ? "½"
          : value === 0.25
            ? "¼"
            : value.toString()}
      <span className="font-mono">X</span>
    </div>
  )
}

function AttackRow({
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
        className={`${backgroundColors[attackName]} py-1 px-2 ring rounded-l-sm flex-4 text-sm font-medium uppercase font-mono flex items-center`}
      >
        {attackName}
      </div>
      <MultiplierCell key={`${attackName}-cell`} value={multiplier} />
    </div>
  ) : null
}

function EffectiveGroup({ heading, rows }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center italic font-medium">{heading}</div>
      <div className="flex gap-4 justify-center flex-wrap">
        {rows.map((row) => (
          <AttackRow key={row.attackName} {...row} />
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
    <div className="p-4 rounded-sm flex flex-col gap-6">
      <EffectiveGroup heading="super effective" rows={positiveRows} />
      <EffectiveGroup heading="not effective" rows={negativeRows} />
    </div>
  ) : null
}
