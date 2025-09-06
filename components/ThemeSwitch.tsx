import { Radio, RadioGroup } from "@headlessui/react"
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const IconButton = ({ value, icon }) => {
  return (
    <Radio
      className={`group flex cursor-pointer items-center justify-center border-r border-zinc-600 bg-zinc-100 px-1.5 py-1 font-mono transition-colors first:rounded-l-full last:rounded-r-full last:border-0 hover:bg-zinc-200 data-checked:bg-zinc-400 data-checked:font-medium data-disabled:cursor-not-allowed data-disabled:bg-zinc-200 data-disabled:text-zinc-300 data-disabled:italic dark:border-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-500 dark:data-checked:bg-zinc-500 dark:data-disabled:bg-zinc-500 dark:data-disabled:text-zinc-400`}
      key={value}
      value={value}
    >
      <span className="size-4">{icon}</span>
    </Radio>
  )
}

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-x-px">
      <RadioGroup
        className="flex rounded-full text-zinc-700 ring dark:text-zinc-300 dark:ring-zinc-500"
        onChange={(val) => setTheme(val)}
        value={theme}
      >
        <IconButton value="system" icon={<ComputerDesktopIcon />} />
        <IconButton value="dark" icon={<MoonIcon />} />
        <IconButton value="light" icon={<SunIcon />} />
      </RadioGroup>
    </div>
  )
}

export default ThemeSwitch
