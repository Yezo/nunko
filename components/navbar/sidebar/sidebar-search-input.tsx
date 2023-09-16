"use client"

import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export const SidebarSearchInput = () => {
  const BASE_URL = usePathname() // Get the current pathname = '/search/anime/top-100'
  const BASE_TYPE = "q" // Lowercase base = 'order_by', 'sort', 'type'
  const searchParams = useSearchParams() // Get the query parameters from the URL
  const queryParam = searchParams.get("q")

  const [value, setValue] = useState(queryParam)
  const router = useRouter()

  const debounced = useDebouncedCallback((value) => {
    setValue(value)
  }, 1500)

  useEffect(() => {
    if (value) {
      router.push(`/search?q=${value}`)
    }
  }, [BASE_URL, router, searchParams, value])

  return (
    <div className="mb-4 mt-8 flex items-center">
      <Input
        placeholder="Search..."
        type="text"
        className="cursor-pointer text-xs capitalize placeholder:text-xs placeholder:capitalize"
        defaultValue={""}
        onChange={(e) => debounced(e.target.value)}
      />
      <MagnifyingGlassIcon className="-m-8 cursor-pointer text-muted-foreground" />
    </div>
  )
}
