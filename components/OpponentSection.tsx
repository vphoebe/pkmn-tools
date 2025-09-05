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

const typeClassName = (type: string) =>
  `${backgroundColors[type]} p-1 ring rounded-sm flex-1 text-center uppercase font-mono`

function Sprite({ url, name }: { url?: string; name: string }) {
  return (
    <div className="flex-1">
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
    <div className="flex flex-col border px-4 pt-4 pb-6 rounded-md gap-4 bg-zinc-50">
      <div className="text-center italic font-medium leading-none">
        opponent
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="flex mb-4 h-12 items-center">
            <PokemonSelector
              pokemonData={pokemonData}
              pokemonList={pokemonList}
            />
          </div>
          <div className="flex gap-2">
            {genTypes.map((t) => (
              <span key={t.type.name} className={typeClassName(t.type.name)}>
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
