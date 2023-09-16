"use client"

import { ANIME_MAIN_GENRES_DATA } from "@/components/anime/top/anime-data"
import { Input } from "@/components/ui/input"
import { calculatePlaceholderText, createQueryString } from "@/lib/utils-dropdown"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export const AnimeFilterInput = () => {
  const router = useRouter()
  const BASE_URL = usePathname() // Get the current pathname = '/search/anime/top-100'
  const BASE_TYPE = "q" // Lowercase base = 'order_by', 'sort', 'type'
  const searchParams = useSearchParams() // Get the query parameters from the URL
  const queryParam = searchParams.get("q") // The query string = 'One Piece', 'Bleach', 'Naruto'
  const [value, setValue] = useState(queryParam)

  const debounced = useDebouncedCallback((value) => {
    setValue(value)
  }, 1000)

  useEffect(() => {
    //If there's a query, redirect to the new URL with the q parameter
    if (value) {
      router.push(
        `${BASE_URL}/?${createQueryString(
          BASE_TYPE,
          value.toLowerCase(),
          searchParams,
          ANIME_MAIN_GENRES_DATA
        )}`
      )
    }
    //If there's no query, we want to redirect back to ALL while maintaining the other filters
    if (!value) {
      router.push(
        `${BASE_URL}/?${createQueryString(BASE_TYPE, "", searchParams, ANIME_MAIN_GENRES_DATA)}`
      )
    }
  }, [BASE_URL, router, searchParams, value])

  return (
    <div className="flex items-center">
      <Input
        placeholder={calculatePlaceholderText(searchParams, BASE_TYPE)}
        type="text"
        className="text-xs capitalize placeholder:text-xs placeholder:capitalize"
        defaultValue={""}
        onChange={(e) => debounced(e.target.value)}
      />
      <MagnifyingGlassIcon className="-m-8 text-muted-foreground" />
    </div>
  )
}
