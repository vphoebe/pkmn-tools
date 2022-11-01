import * as React from "react";
import { TypeData } from "../lib/getTypes";
import { getMultiplier, valueColorMap } from "../lib/multiplier";

interface AttackTableProps {
  data: TypeData[];
  typeList: string[];
  defenseTypes: string[];
}

const globalCellClasses =
  "border border-2 border-slate-300 dark:border-slate-700 text-slate-900";

function MultiplierCell({ value }: { value: number }) {
  return (
    <td
      className={`w-8 align-middle text-center font-bold ${valueColorMap[value]} ${globalCellClasses}`}
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
      <td className={`bg-${attackName} text-right pr-2 ${globalCellClasses}`}>
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
      <div className="w-full text-center mb-2 italic">Attacking:</div>
      <div className="flex gap-x-4 mb-2">
        <div className="w-full">
          <table className="table-auto w-full">
            <tbody>
              {positiveRows.map((row) => (
                <AttackRow key={row.attackName} {...row} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full">
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
