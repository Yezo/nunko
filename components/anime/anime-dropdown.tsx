"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ANIME_MAIN_GENRES_DATA } from "@/lib/search-filter-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AnimeFilterDropdownProps = {
  title: string
  type: string
  data: string[] | number[]
  scrollable?: boolean
}

export function AnimeFilterDropdown({ title, type, data, scrollable }: AnimeFilterDropdownProps) {
  const BASE_URL = usePathname() // /search/anime/top-100
  const BASE_TYPE = type.toLowerCase() // order_by, sort, type
  const searchParams = useSearchParams()

  const renameParameters = (value: string | number) => {
    const val = value && value.toString().toLowerCase()
    if (val === "tv") return "TV Show"
    if (val === "start_date") return "Release Date"
    if (val === "ova") return "OVA"
    if (val === "ona") return "ONA"
    if (val && val.toString().startsWith("20")) return val.slice(0, 4)
    if (val && val.toString().startsWith("19")) return val.slice(0, 4)
    else return val
  }

  const calculatePlaceholderText = () => {
    const params = new URLSearchParams(searchParams)

    //Splitting the params into their own strings
    const split = params.toString().split("&")
    const split2 = split.map((item) => item.split("="))

    //Convert the array of strings into an object
    const obj = split2.map((x) => ({
      type: x[0],
      value: x[1],
    }))

    //Find the param that matches the dropdown TYPE
    const filtered = obj.filter((item) => item.type === BASE_TYPE)

    //Display the genre title instead of accidentally displaying the genre's ID
    if (filtered[0]?.type === "genres") {
      const list = ANIME_MAIN_GENRES_DATA
      const filterMatch = list.filter((item) => item.id.toLowerCase() === filtered[0]?.value)
      return renameParameters(filterMatch[0]?.genre)
    }
    //Rename the value if it has a wonky parameter name beforehand
    const result = renameParameters(filtered[0]?.value)

    return result
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      //Get the search parameters
      const params = new URLSearchParams(searchParams)

      //Append new set of paramaters based on what user clicked
      params.set(name, value)

      //Handles use case where RANK and POPULARITY must be in ASC sorting
      //Handles use case where toggling another dropdown that isn't ORDER_BY causes
      //the SORT to default back to DESC even if it's currently POPULARITY or RANK
      if (BASE_TYPE === "order_by") {
        //Set sorting to ASC only when TYPE is ORDER_BY when USER selects POPULARITY or RANK
        value === "popularity" || value === "rank"
          ? params.set("sort", "asc")
          : params.set("sort", "desc")
      }

      //Remove extra text from parameter when displayed to the user
      if (name.toString().toLowerCase() === "start_date") {
        const sliced = value.slice(0, 5)
        const yes = sliced + "12-31"
        params.set("end_date", yes)
      }

      //Transform the current genre into an ID that the API takes in
      if (name.toString().toLowerCase() === "genres") {
        const list = ANIME_MAIN_GENRES_DATA
        const filtered = list.filter((item) => item.genre.toLowerCase() === value)
        params.set("genres", filtered[0]?.id)
      }

      return params.toString()
    },
    [searchParams, BASE_TYPE]
  )

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <p className="flex min-w-full items-center justify-between">
            <span className="text-xs font-semibold capitalize text-muted-foreground">
              {calculatePlaceholderText() ?? renameParameters(title)}
            </span>
            <CaretSortIcon />
          </p>
        </Button>
      </DropdownMenuTrigger>

      {/* fix dropdown widths later */}
      <DropdownMenuContent className="min-h-fit min-w-[150px] sm:min-w-[280px] md:min-w-[180px] lg:min-w-[200px] xl:min-w-[228px]">
        <DropdownMenuGroup>
          {scrollable ? (
            <ScrollArea className="h-64 pr-4">
              {data.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link
                    href={`${BASE_URL}/?${createQueryString(
                      BASE_TYPE,
                      item.toString().toLowerCase()
                    )}`}
                    className="px-3 text-[0.8rem] capitalize text-muted-foreground transition-colors  hover:text-foreground"
                  >
                    {renameParameters(item)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          ) : (
            data.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  href={`${BASE_URL}/?${createQueryString(
                    BASE_TYPE,
                    item.toString().toLowerCase()
                  )}`}
                  className="px-3 text-[0.8rem] capitalize text-muted-foreground transition-colors  hover:text-foreground"
                >
                  {renameParameters(item)}
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
