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
        className={`bg-${attackName} font-bold text-right py-2 pr-2 ${globalCellClasses}`}
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
  defenseName1,
  defenseName2,
}: AttackTableProps) {
  const attackRowValues = React.useMemo(() => {
    const values = typeList.map((attackName) => {
      const multiplier = getMultiplier(data, attackName, [
        defenseName1,
        defenseName2,
      ]);
      return { attackName, multiplier };
    });
    return values.sort((a, b) => b.multiplier - a.multiplier);
  }, [data, defenseName1, defenseName2, typeList]);

  return (
    <React.Fragment>
      <div className="font-mono w-full text-center mb-4">Attacking:</div>
      <table className="table-auto w-full h-full font-mono">
        <tbody>
          {attackRowValues.map((row) => (
            <AttackRow key={row.attackName} {...row} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
