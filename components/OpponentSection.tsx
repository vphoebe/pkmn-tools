import Image from "next/image"
import type PokeAPI from "pokedex-promise-v2"

import { backgroundColors } from "../helpers/colors"
import type { PokemonData } from "../helpers/getPokemonData"
import { getGenSprite, getGenTypesFromPokemon } from "../helpers/getPokemonData"
import PokemonSelector from "./PokemonSelector"

interface OpponentSectionProps {
  gen: number
  pokemonData: PokemonData
  pokemonList: PokeAPI.NamedAPIResource[]
}

function Sprite({ url, name }: { url?: string; name: string }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-sm border p-1 dark:border-zinc-500">
      {url ? (
        <Image
          priority={true}
          alt={name ?? ""}
          src={url}
          width={96}
          height={96}
        />
      ) : null}
    </div>
  )
}

export function OpponentSection({
  pokemonData,
  pokemonList,
  gen,
}: OpponentSectionProps) {
  const { name, sprites } = pokemonData
  const genTypes = getGenTypesFromPokemon(pokemonData, gen)
  const spriteUrl = getGenSprite(gen, sprites)
  return (
    <div className="flex flex-col gap-4 rounded-md border bg-blue-50 px-4 pt-4 pb-6 dark:border-zinc-500 dark:bg-blue-950/10">
      <div className="text-center leading-none font-medium italic">
        opponent
      </div>
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-center">
            <PokemonSelector
              pokemonData={pokemonData}
              pokemonList={pokemonList}
            />
          </div>
          <div className="flex gap-2 dark:text-black">
            {genTypes.map((t) => (
              <span
                key={t.type.name}
                className={`${backgroundColors[t.type.name]} flex-1 rounded-sm p-1 text-center font-mono text-sm uppercase ring`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
        <Sprite name={name} url={spriteUrl} />
      </div>
    </div>
  )
}
