"use client"

import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

type SidebarSearchInputProps = {
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export const SidebarSearchInput = ({ setOpen }: SidebarSearchInputProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q")
  const [value, setValue] = useState(queryParam)

  const debounced = useDebouncedCallback((value) => {
    setValue(value)
  }, 1500)

  const handleClose = useCallback(() => {
    if (setOpen) {
      setOpen(false)
    }
  }, [setOpen])

  useEffect(() => {
    if (value) {
      handleClose()
      router.push(`/search?q=${value}`)
    }
  }, [router, value, handleClose])

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
