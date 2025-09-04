import * as React from "react";
import { getMultiplier, valueColorMap } from "../helpers/multiplier";
import { backgroundColors } from "../helpers/colors";
import { GenTypeData } from "../helpers/getTypeData";

interface AttackTableProps {
  data: GenTypeData[];
  typeList: string[];
  defenseTypes: string[];
}

function MultiplierCell({ value }: { value: number }) {
  return (
    <td
      className={`rounded-r-sm ring w-8 align-middle text-center font-bold ${valueColorMap[value]}`}
    >
      {value === 0
        ? "X"
        : value === 0.5
          ? "½"
          : value === 0.25
            ? "¼"
            : value.toString()}
    </td>
  );
}

function AttackRow({
  attackName,
  multiplier,
}: {
  attackName: string;
  multiplier: number;
}) {
  return multiplier !== 1 ? (
    <tr key={`${attackName}-row`}>
      <td
        className={`${backgroundColors[attackName]} text-right pr-2 ring rounded-l-sm`}
      >
        {attackName}
      </td>
      <MultiplierCell key={`${attackName}-cell`} value={multiplier} />
    </tr>
  ) : null;
}

export function AttackTable({
  data,
  typeList,
  defenseTypes,
}: AttackTableProps) {
  const attackRowValues = React.useMemo(() => {
    const values = typeList.map((attackName) => {
      const multiplier = getMultiplier(data, attackName, defenseTypes);
      return { attackName, multiplier };
    });
    return values.sort((a, b) => b.multiplier - a.multiplier);
  }, [data, defenseTypes, typeList]);

  const positiveRows = attackRowValues.filter((row) => row.multiplier > 1);
  const negativeRows = attackRowValues.filter((row) => row.multiplier < 1);

  return defenseTypes[0] !== "none" ? (
    <div className="border border-slate-400 p-2 rounded-sm">
      <div className="w-full text-center mb-2 italic">Super effective:</div>
      <div className="flex-col gap-x-4 mb-2">
        <div className="flex-1">
          <table className="table-auto w-full">
            <tbody>
              {positiveRows.map((row) => (
                <AttackRow key={row.attackName} {...row} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full text-center my-2 italic">Not effective:</div>
        <div className="flex-1">
          <table className="table-auto w-full">
            <tbody>
              {negativeRows.map((row) => (
                <AttackRow key={row.attackName} {...row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null;
}
