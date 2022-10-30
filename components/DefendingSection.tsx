import { PokemonListItem } from "../lib/getPokemonList";
import { TypeSelector } from "./TypeSelector";
import Select from "react-select";
import * as React from "react";
import { Generation, getGenNumberFromUrl } from "../lib/getTypes";
import Image from "next/image";

interface DefendingSectionProps {
  typeList: string[];
  defenseTypes: string[];
  setDefenseTypes: any;
  pokemonList: PokemonListItem[];
  gen: Generation;
}

async function getPokemonTypesByName(
  name: string,
  generation: Generation
): Promise<{ type1: string; type2: string; spriteUrl: string }> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const json = await res.json();
  const { types, past_types, sprites } = json;
  if (generation !== "current" && past_types.length) {
    const oldTypeChange = past_types[0];
    const oldTypeGenNumber = getGenNumberFromUrl(oldTypeChange.generation.url);
    // can't be current gen
    const currentGenNumber = generation === "generation-v" ? 5 : 1;
    if (oldTypeGenNumber && oldTypeGenNumber <= currentGenNumber) {
      return {
        type1: oldTypeChange.types[0].type.name,
        type2: oldTypeChange.types[1]
          ? oldTypeChange.types[1].type.name
          : "none",
        spriteUrl: sprites.front_default,
      };
    }
  }
  return {
    type1: types[0].type.name,
    type2: types[1] ? types[1].type.name : "none",
    spriteUrl: sprites.front_default,
  };
}

function PokemonSelector({
  pokemonList,
  pokemon,
  setPokemon,
}: {
  pokemonList: PokemonListItem[];
  pokemon: { value: string } | null;
  setPokemon: any;
}) {
  const styles = {
    container: (provided: any) => ({
      ...provided,
      flex: "1",
    }),
    option: (provided: any) => ({
      ...provided,
      color: "black",
    }),
  };
  const options = pokemonList.map((p) => ({ label: p.name, value: p.name }));
  return (
    <div className="flex flex-1 h-full items-center">
      <Select
        styles={styles}
        options={options}
        value={pokemon}
        onChange={(val) => setPokemon(val)}
        isClearable
      />
    </div>
  );
}

export function DefendingSection({
  typeList,
  defenseTypes,
  setDefenseTypes,
  pokemonList,
  gen,
}: DefendingSectionProps) {
  const [pokemon, setPokemon] = React.useState<{ value: string } | null>(null);
  const [spriteUrl, setSpriteUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (pokemon) {
      getPokemonTypesByName(pokemon.value, gen).then((obj) => {
        setDefenseTypes([obj?.type1 ?? "none", obj?.type2 ?? "none"]);
        setSpriteUrl(obj.spriteUrl);
      });
    } else {
      setDefenseTypes(["none", "none"]);
      setSpriteUrl(null);
    }
  }, [pokemon, setDefenseTypes, gen]);

  return (
    <div>
      <div className="w-full text-center mb-4">Defending:</div>
      <div className="mb-4 flex h-12 items-center">
        <PokemonSelector
          pokemonList={pokemonList}
          pokemon={pokemon}
          setPokemon={setPokemon}
        />
        <div className="w-12 h-full ml-2 bg-slate-400 rounded-sm">
          {spriteUrl ? (
            <Image
              alt={pokemon?.value ?? ""}
              src={spriteUrl}
              width={48}
              height={48}
            />
          ) : null}
        </div>
      </div>
      <div className="flex mb-4 w-full gap-x-2 items-center">
        <TypeSelector
          types={typeList.filter((t) => t !== defenseTypes[1])}
          value={defenseTypes[0]}
          onChange={(e) => {
            setPokemon(null);
            setDefenseTypes([e.currentTarget.value, defenseTypes[1]]);
          }}
        />
        /
        <TypeSelector
          types={typeList.filter((t) => t !== defenseTypes[0])}
          value={defenseTypes[1]}
          onChange={(e) => {
            setPokemon(null);
            setDefenseTypes([defenseTypes[0], e.currentTarget.value]);
          }}
        />
      </div>
    </div>
  );
}
