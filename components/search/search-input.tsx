"use client"

import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { useRouter, useSearchParams } from "next/navigation"

export const SearchInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q")
  const [value, setValue] = useState(queryParam)

  const debounced = useDebouncedCallback((value) => {
    setValue(value)
  }, 1500)

  useEffect(() => {
    if (value) {
      router.push(`/search?q=${value}`)
    }
  }, [router, value])

  return (
    <div className="flex items-center py-4 pt-8">
      <Input
        placeholder="Search..."
        type="text"
        className="text-xs capitalize placeholder:text-xs placeholder:capitalize"
        defaultValue={""}
        onChange={(e) => debounced(e.target.value)}
      />
      <MagnifyingGlassIcon className="-m-8 text-muted-foreground" />
    </div>
  )
}
