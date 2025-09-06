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
    <div className="mb-4 flex items-center gap-x-px">
      <RadioGroup
        className="flex flex-1 justify-between rounded-sm ring dark:ring-zinc-600"
        onChange={(val) => setGen(val)}
        value={gen}
      >
        <div
          className={`flex flex-2 items-center justify-center rounded-l-sm border-r bg-blue-800/25 py-1 font-mono text-sm dark:border-zinc-600`}
        >
          GEN
        </div>
        {count.map((_, i) => (
          <Radio
            className={`group flex flex-1 cursor-pointer items-center justify-center border-r border-black bg-zinc-100 py-1 font-mono transition-colors last:rounded-r-sm last:border-0 hover:bg-blue-200 data-checked:bg-blue-400 data-checked:font-medium data-disabled:cursor-not-allowed data-disabled:bg-zinc-200 data-disabled:text-zinc-300 data-disabled:italic dark:border-zinc-600 dark:bg-zinc-700 dark:hover:bg-blue-500 dark:data-checked:bg-blue-700 dark:data-disabled:bg-zinc-500 dark:data-disabled:text-zinc-400/25`}
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
