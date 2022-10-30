import { PokemonListItem } from "../lib/getPokemonList";
import { TypeSelector } from "./TypeSelector";
import Select from "react-select";
import * as React from "react";
import { Generation } from "../lib/getTypes";

interface DefendingSectionProps {
  typeList: string[];
  defenseName1?: string;
  defenseName2?: string;
  setDefenseName1: any;
  setDefenseName2: any;
  pokemonList: PokemonListItem[];
}

async function getPokemonByName(name: string, generation: Generation) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) return;
  const json = await res.json();
  const { types, past_types } = json;
  if (generation === "current") {
    return {
      type1: types[0].type.name,
      type2: types[1]?.type.name,
    };
  }
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
    option: (provided: any) => ({
      ...provided,
      color: "black",
    }),
  };
  const options = pokemonList.map((p) => ({ label: p.name, value: p.name }));
  return (
    <Select
      styles={styles}
      options={options}
      value={pokemon}
      onChange={(val) => setPokemon(val)}
    />
  );
}

export function DefendingSection({
  typeList,
  defenseName1,
  defenseName2,
  setDefenseName1,
  setDefenseName2,
  pokemonList,
}: DefendingSectionProps) {
  const [pokemon, setPokemon] = React.useState<{ value: string } | null>(null);

  React.useEffect(() => {
    if (pokemon) {
      getPokemonByName(pokemon.value, "current").then((obj) => {
        setDefenseName1(obj?.type1);
        setDefenseName2(obj?.type2);
      });
    }
  }, [pokemon, setDefenseName1, setDefenseName2]);

  return (
    <div>
      <div className=" w-full text-center mb-4">Defending:</div>
      <div className="mb-4">
        <PokemonSelector
          pokemonList={pokemonList}
          pokemon={pokemon}
          setPokemon={setPokemon}
        />
      </div>
      <div className="flex mb-4 w-full gap-x-2 items-center">
        <TypeSelector
          types={typeList.filter((t) => t !== defenseName2)}
          value={defenseName1}
          onChange={(e) => setDefenseName1(e.currentTarget.value)}
        />
        /
        <TypeSelector
          types={typeList.filter((t) => t !== defenseName1)}
          value={defenseName2}
          onChange={(e) => setDefenseName2(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}
