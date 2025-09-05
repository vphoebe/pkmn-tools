import { Radio, RadioGroup } from "@headlessui/react"
import type React from "react"

interface GenSelectorProps {
  gen: number
  introduced: number
  setGen: React.Dispatch<React.SetStateAction<number>>
}

export const CURRENT_GEN: number = 9

export function GenSelector({ gen, setGen, introduced }: GenSelectorProps) {
  const count = Array.from({ length: CURRENT_GEN })
  return (
    <div className="flex items-center mb-4 gap-x-px">
      <RadioGroup
        className="flex flex-1 justify-between ring rounded-sm"
        onChange={(val) => setGen(val)}
        value={gen}
      >
        <div
          className={`font-mono text-sm flex flex-2 py-1 items-center bg-blue-800/25 rounded-l-sm justify-center border-r`}
        >
          GEN
        </div>
        {count.map((_, i) => (
          <Radio
            className={`font-mono cursor-pointer group flex flex-1 py-1 items-center justify-center border-black bg-zinc-100 data-checked:bg-blue-400 hover:bg-blue-200 data-checked:font-medium last:rounded-r-sm border-r last:border-0 data-disabled:bg-zinc-200 data-disabled:text-zinc-300 data-disabled:cursor-not-allowed data-disabled:italic`}
            key={`gen${i + 1}`}
            value={i + 1}
            disabled={i + 1 < introduced}
          >
            {i + 1}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}
