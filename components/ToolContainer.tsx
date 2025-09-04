"use client";

import { getTypeDataForGen } from "../helpers/getTypeData";
import * as React from "react";
import { DefendingSection } from "./DefendingSection";
import { AttackTable } from "./AttackTable";
import { GenSelector } from "./GenSelector";
import PokeAPI from "pokedex-promise-v2";
import { getGenTypesFromPokemon } from "../helpers/getPokemonData";

export interface TypeChartToolProps {
  pokemonData: PokeAPI.Pokemon;
  pokemonList: PokeAPI.NamedAPIResource[];
  allTypeData: PokeAPI.Type[];
}

export default function TypeChartTool({
  pokemonData,
  pokemonList,
  allTypeData,
}: TypeChartToolProps) {
  const [gen, setGen] = React.useState<number>(9);
  const typeData = React.useMemo(
    () => getTypeDataForGen(allTypeData, gen),
    [allTypeData, gen],
  );
  const typeList = React.useMemo(() => typeData.map((d) => d.name), [typeData]);
  const defenseTypes = getGenTypesFromPokemon(pokemonData, gen).map(
    (t) => t.type.name,
  );

  return (
    <div className="max-w-sm mx-auto mt-8 px-4">
      <GenSelector gen={gen} setGen={setGen} />
      <DefendingSection
        gen={gen}
        pokemonData={pokemonData}
        pokemonList={pokemonList}
      />
      <AttackTable
        data={typeData}
        typeList={typeList}
        defenseTypes={defenseTypes}
      />
    </div>
  );
}
