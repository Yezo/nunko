"use client"

import { CaretSortIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AnimeListFilterSelectProps = {
  placeholder: string
  data: string[]
}

export const AnimeListFilterSelect = ({ placeholder, data }: AnimeListFilterSelectProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const currentValue = params.get(placeholder.toLowerCase())

  const createQueryString = (key: string, value: string) => {
    if (currentValue?.toLowerCase() === value.toLowerCase()) params.delete(key)
    else if (currentValue?.toLowerCase() !== value.toLowerCase()) params.set(key, value)
    return params.toString()
  }

  function handleSelect(value: string) {
    const key = placeholder.toLowerCase()
    const val = value.toString().toLowerCase().trim()
    const query = createQueryString(key, val)
    const link = `${pathname}/?${query}`
    router.push(`${link}`)
  }

  function renameDropdownItem(item: string) {
    if (item === "TV") return "TV Show"
    if (item === "Finished Airing") return "Completed"
    return item
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className={`relative flex h-9 min-w-[10.5rem] items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm capitalize shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
            currentValue ? "" : "text-muted-foreground"
          }`}
        >
          {currentValue ? currentValue : placeholder}
          <CaretSortIcon className="h-4 w-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[10.5rem]">
          <DropdownMenuRadioGroup value={currentValue ?? ""} onValueChange={handleSelect}>
            {data.map((item) => (
              <DropdownMenuRadioItem
                key={item}
                value={item.toLowerCase()}
                onSelect={() => handleSelect(item)}
                className="text-sm text-muted-foreground data-[state=checked]:text-foreground"
              >
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
