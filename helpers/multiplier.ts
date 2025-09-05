import type { GenTypeData } from "./getTypeData"

export const valueColorMap: Record<number, string> = {
  0.5: "bg-half",
  0.25: "bg-quarter",
  2: "bg-double",
  4: "bg-quad",
  0: "bg-zinc-400",
}

function getSingleTypeDamageValue(
  data: GenTypeData[],
  attackName: string,
  defenseName: string,
) {
  const attackData = data.find((d) => d.name === attackName) as GenTypeData
  const { half, none, double } = attackData
  if (half.includes(defenseName)) return 0.5
  if (none.includes(defenseName)) return 0
  if (double.includes(defenseName)) return 2
  return 1
}

export function getMultiplier(
  data: GenTypeData[],
  attackName: string,
  defenseNames: string[],
) {
  return defenseNames.reduce((prev, current) => {
    return (
      prev *
      (current !== "none"
        ? getSingleTypeDamageValue(data, attackName, current)
        : 1)
    )
  }, 1)
}
