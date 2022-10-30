import * as React from "react";
import { TypeData } from "../lib/getTypes";
import { getMultiplier, valueColorMap } from "../lib/multiplier";

interface AttackTableProps {
  data: TypeData[];
  typeList: string[];
  defenseName1?: string;
  defenseName2?: string;
}

const globalCellClasses =
  "border border-2 border-slate-300 dark:border-slate-700";

function MultiplierCell({ value }: { value: number }) {
  return (
    <td
      className={`align-middle text-center ${valueColorMap[value]} ${globalCellClasses}`}
    >
      {value === 0.5 ? "½" : value === 0.25 ? "¼" : value.toString()}
    </td>
  );
}

export function AttackTable({
  data,
  typeList,
  defenseName1,
  defenseName2,
}: AttackTableProps) {
  return (
    <React.Fragment>
      <div className="font-mono w-full text-center mb-4">Attacking:</div>
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
