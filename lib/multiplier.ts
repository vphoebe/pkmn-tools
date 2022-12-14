import { TypeData } from "./getTypes";

export const valueColorMap: Record<number, string> = {
  0.5: "bg-half",
  0.25: "bg-quarter",
  2: "bg-double",
  4: "bg-quad",
  0: "bg-slate-400",
};

function getSingleTypeDamageValue(
  data: TypeData[],
  attackName: string,
  defenseName: string
) {
  const attackData = data.find((d) => d.name === attackName) as TypeData;
  const { half, none, double } = attackData;
  if (half.includes(defenseName)) return 0.5;
  if (none.includes(defenseName)) return 0;
  if (double.includes(defenseName)) return 2;
  return 1;
}

export function getMultiplier(
  data: TypeData[],
  attackName: string,
  defenseNames: string[]
) {
  return defenseNames.reduce((prev, current) => {
    return (
      prev *
      (current !== "none"
        ? getSingleTypeDamageValue(data, attackName, current)
        : 1)
    );
  }, 1);
}
