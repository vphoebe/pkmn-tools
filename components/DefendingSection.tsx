import { TypeSelector } from "./TypeSelector";

interface DefendingSectionProps {
  typeList: string[];
  defenseName1?: string;
  defenseName2?: string;
  setDefenseName1: any;
  setDefenseName2: any;
}

export function DefendingSection({
  typeList,
  defenseName1,
  defenseName2,
  setDefenseName1,
  setDefenseName2,
}: DefendingSectionProps) {
  return (
    <div>
      <div className="font-mono w-full text-center mb-4">Defending:</div>
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
    </div>
  );
}
