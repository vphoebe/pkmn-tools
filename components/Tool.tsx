import { Generation, TypeData } from "../lib/getTypes";
import * as React from "react";
import { GenSelector } from "./GenSelector";
import { DefendingSection } from "./DefendingSection";
import { AttackTable } from "./AttackTable";
import { PokemonListItem } from "../lib/getPokemonList";

export interface TypeChartToolProps {
  typeData: TypeData[];
  pokemonList: PokemonListItem[];
  gen: Generation;
}

export default function TypeChartTool({
  typeData,
  pokemonList,
  gen,
}: TypeChartToolProps) {
  const typeList = typeData.map((d) => d.name);
  const [defenseTypes, setDefenseTypes] = React.useState<string[]>([
    "none",
    "none",
  ]);

  return (
    <div className="max-w-sm mx-auto mt-8">
      <GenSelector />
      <DefendingSection
        typeList={typeList}
        defenseTypes={defenseTypes}
        setDefenseTypes={setDefenseTypes}
        pokemonList={pokemonList}
        gen={gen}
      />
      <AttackTable
        data={typeData}
        typeList={typeList}
        defenseTypes={defenseTypes}
      />
    </div>
  );
}
