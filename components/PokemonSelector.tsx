"use client";

import Select from "react-select";
import { PokemonListItem } from "../helpers/getPokemonList";
import React from "react";
import useParamsUpdate from "../helpers/useParams";

export default function PokemonSelector({
  pokemonList,
  name,
}: {
  pokemonList: PokemonListItem[];
  name: string;
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
  const { updatePokemon } = useParamsUpdate();

  return (
    <div className="flex flex-1 h-full items-center">
      <Select
        styles={styles}
        options={options}
        value={{ label: name, value: name }}
        onChange={(opt) => updatePokemon(opt.value)}
        isClearable
      />
    </div>
  );
}
