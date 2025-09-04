interface GenSelectorProps {
  gen: number;
  setGen: (val: number) => void;
}

export function GenSelector({ gen, setGen }: GenSelectorProps) {
  return (
    <div className="flex items-center mb-4 gap-x-px">
      <span className="mr-4">Gen:</span>
      <select
        onChange={(e) => setGen(parseInt(e.currentTarget.value))}
        value={gen}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
    </div>
  );
}
