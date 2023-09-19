"use client"

import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

export const AppearanceThemePicker = () => {
  const { theme, setTheme } = useTheme()
  const ifLight = theme && theme === "light"
  const ifDark = theme && theme === "dark"

  return (
    <>
      <h2>Appearance</h2>
      <div className="flex divide-x divide-border rounded-md border">
        <div
          className={`flex-1 select-none p-8  ${
            ifLight
              ? "cursor-not-allowed bg-muted/50"
              : "cursor-pointer transition-colors hover:bg-muted/80"
          }`}
          onClick={() => setTheme("light")}
        >
          <div className="grid place-items-center gap-2">
            <SunIcon className="h-5 w-5" />
            <div className="text-sm font-medium">Light Mode</div>
          </div>
        </div>

        <div
          className={`flex-1 select-none p-8  ${
            ifDark
              ? "cursor-not-allowed  bg-muted/50"
              : "cursor-pointer transition-colors hover:bg-muted/80"
          }`}
          onClick={() => setTheme("dark")}
        >
          <div className="grid place-items-center gap-2">
            <MoonIcon className="h-5 w-5" />
            <div className="text-sm font-medium">Dark Mode</div>
          </div>
        </div>
      </div>
    </>
  )
}
