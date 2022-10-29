"use client";

import { TypeData } from "../lib/getTypes";
import { getMultiplier, valueColorMap } from "../lib/multiplier";
import * as React from "react";

const globalCellClasses = "border border-2 border-slate-300";

function MultiplierCell({ value }: { value: number }) {
  return (
    <td
      className={`align-middle text-center ${valueColorMap[value]} ${globalCellClasses}`}
    >
      {value === 0.5 ? "½" : value === 0.25 ? "¼" : value.toString()}
    </td>
  );
}

function TypeSelector({
  types,
  value,
  onChange,
}: {
  types: string[];
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <select
      onChange={onChange}
      value={value}
      className="px-4 py-2 flex-1 rounded"
    >
      <option value={undefined}>------</option>
      {types.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}

export default function Table({ data }: { data: TypeData[] }) {
  const typeList = data.map((d) => d.name);
  const [defenseName1, setDefenseName1] = React.useState<string | undefined>(
    "normal"
  );
  const [defenseName2, setDefenseName2] = React.useState<string | undefined>(
    undefined
  );

  return (
    <React.Fragment>
      <div className="font-mono w-full text-center">Defending:</div>
      <div className="flex mb-4 w-full gap-x-2 font-mono items-center">
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
      <div className="font-mono w-full text-center">Attacking:</div>
      <table className="table-auto w-full h-full font-mono">
        <tbody>
          {typeList.map((attackName) => {
            const multiplier = getMultiplier(data, attackName, [
              defenseName1,
              defenseName2,
            ]);
            return multiplier !== 1 ? (
              <tr key={`${attackName}-row`}>
                <td
                  className={`bg-${attackName} font-bold text-right py-2 pr-2 ${globalCellClasses}`}
                >
                  {attackName}
                </td>
                <MultiplierCell key={`${attackName}-cell`} value={multiplier} />
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}
