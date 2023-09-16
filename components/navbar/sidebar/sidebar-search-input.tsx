"use client"

import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export const SidebarSearchInput = () => {
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
    <div className="mb-4 mt-8 flex items-center">
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
