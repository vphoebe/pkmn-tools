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
  const [defenseName1, setDefenseName1] = React.useState<string | undefined>(
    undefined
  );
  const [defenseName2, setDefenseName2] = React.useState<string | undefined>(
    undefined
  );

  return (
    <div className="max-w-sm mx-auto">
      <GenSelector />
      <DefendingSection
        typeList={typeList}
        defenseName1={defenseName1}
        defenseName2={defenseName2}
        setDefenseName1={setDefenseName1}
        setDefenseName2={setDefenseName2}
        pokemonList={pokemonList}
      />
      <AttackTable
        data={typeData}
        typeList={typeList}
        defenseName1={defenseName1}
        defenseName2={defenseName2}
      />
    </div>
  );
}
