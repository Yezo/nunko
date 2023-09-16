"use client"

import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon, UpdateIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useDebounce, useDebouncedCallback } from "use-debounce"
import { getSearchAnime } from "@/lib/fetchJikan"
import { ITopAnime, ITopAnimeData } from "@/types/anime/type-top-anime"
import { useRouter } from "next/navigation"

type Props = {}
export const SearchInput = ({}: Props) => {
  const [value, setValue] = useState("")
  const [data, setData] = useState<ITopAnimeData[] | null>(null) // Initialize data state to store API response
  const [loading, setLoading] = useState(false) // Add a loading state
  const [db] = useDebounce(value, 1000)
  const router = useRouter()

  const debounced = useDebouncedCallback((value) => {
    setValue(value)
  }, 1000)

  useEffect(() => {
    // Call fetchData when debouncedValue changes (user stops typing)
    if (db && db.length > 0) {
      router.push(`/search?q=${db}`)
    }
  }, [db, router])

  return (
    <div className="flex items-center py-4 pt-8">
      <Input
        placeholder="Search..."
        type="text"
        className="cursor-pointer text-xs placeholder:text-xs"
        defaultValue={""}
        onChange={(e) => debounced(e.target.value)}
      />
      <MagnifyingGlassIcon className="-m-8 cursor-pointer text-muted-foreground" />
    </div>
  )
}
