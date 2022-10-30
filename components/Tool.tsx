import { TypeData } from "../lib/getTypes";
import * as React from "react";
import { GenSelector } from "./GenSelector";
import { DefendingSection } from "./DefendingSection";
import { AttackTable } from "./AttackTable";
import { PokemonListItem } from "../lib/getPokemonList";

export interface TypeChartToolProps {
  typeData: TypeData[];
  pokemonList: PokemonListItem[];
}

export default function TypeChartTool({
  typeData,
  pokemonList,
}: TypeChartToolProps) {
  const typeList = typeData.map((d) => d.name);
  const [defenseTypes, setDefenseTypes] = React.useState<string[]>([
    "none",
    "none",
  ]);

  return (
    <div className="max-w-sm mx-auto">
      <GenSelector />
      <DefendingSection
        typeList={typeList}
        defenseTypes={defenseTypes}
        setDefenseTypes={setDefenseTypes}
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
