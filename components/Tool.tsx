import { TypeData } from "../lib/getTypes";
import * as React from "react";
import Select from "react-select";
import { GenSelector } from "./GenSelector";
import { DefendingSection } from "./DefendingSection";
import { AttackTable } from "./AttackTable";

function PokemonSelector({
  pokemonList,
  setPokemon,
}: {
  pokemonList: { name: string; url: string }[];
  setPokemon: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const options = pokemonList.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  return (
    <Select
      options={options}
      onChange={(newValue) => {
        if (newValue && newValue.value) {
          setPokemon(newValue.value);
        }
      }}
    />
  );
}

export default function TypeChartTool({ data }: { data: TypeData[] }) {
  const typeList = data.map((d) => d.name);
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
      />
      <AttackTable
        data={data}
        typeList={typeList}
        defenseName1={defenseName1}
        defenseName2={defenseName2}
      />
    </div>
  );
}
