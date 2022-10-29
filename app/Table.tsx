"use client";

import { TypeData } from "../lib/getTypes";
import { getMultiplier, valueColorMap } from "../lib/multiplier";
import * as React from "react";

function MultiplierCell({ value }: { value: number }) {
  return (
    <td
      className={`border border-slate-200 align-middle text-center ${valueColorMap[value]}`}
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
    <select onChange={onChange} value={value}>
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
      <div>
        <TypeSelector
          types={typeList.filter((t) => t !== defenseName2)}
          value={defenseName1}
          onChange={(e) => setDefenseName1(e.currentTarget.value)}
        />
        <TypeSelector
          types={typeList.filter((t) => t !== defenseName1)}
          value={defenseName2}
          onChange={(e) => setDefenseName2(e.currentTarget.value)}
        />
      </div>
      <table className="table-fixed w-full h-full">
        <tbody>
          {typeList.map((attackName) => {
            const multiplier = getMultiplier(data, attackName, [
              defenseName1,
              defenseName2,
            ]);
            return multiplier !== 1 ? (
              <tr key={`${attackName}-row`}>
                <td className={`bg-${attackName} font-bold text-right`}>
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
