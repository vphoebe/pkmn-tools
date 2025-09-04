import * as React from "react";
import Image from "next/image";
import PokemonSelector from "./PokemonSelector";
import { backgroundColors } from "../helpers/colors";
import PokeAPI from "pokedex-promise-v2";
import { getGenTypesFromPokemon } from "../helpers/getPokemonData";

interface DefendingSectionProps {
  gen: number;
  pokemonData: PokeAPI.Pokemon;
  pokemonList: PokeAPI.NamedAPIResource[];
}

const typeClassName = (type: string) =>
  `${backgroundColors[type]} p-1 ring rounded-sm flex-1 text-center`;

export function DefendingSection({
  pokemonData,
  pokemonList,
  gen,
}: DefendingSectionProps) {
  const { name, spriteUrl } = pokemonData;
  const genTypes = getGenTypesFromPokemon(pokemonData, gen);
  return (
    <div className="border border-slate-400 p-2 rounded-sm mb-4">
      <div className="w-full text-center italic mb-2">You are fighting a:</div>
      <div className="mb-4 flex h-12 items-center">
        <PokemonSelector name={name} pokemonList={pokemonList} />
        <div className="w-12 h-full ml-2 rounded-sm border border-px border-slate-400">
          {pokemonData.spriteUrl ? (
            <Image
              priority={true}
              alt={name ?? ""}
              src={spriteUrl}
              width={48}
              height={48}
            />
          ) : null}
        </div>
      </div>
      <div className="flex gap-2">
        {genTypes.map((t) => (
          <span key={t.type.name} className={typeClassName(t.type.name)}>
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
