"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import { calculatePlaceholderText, createQueryString, renameParameters } from "@/lib/utils-dropdown"
import { ANIME_MAIN_GENRES_DATA } from "@/components/anime/top/anime-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AnimeFilterDropdownProps = {
  type: string
  data: string[] | number[]
  scrollable?: boolean
}

export function AnimeFilterDropdown({ type, data, scrollable }: AnimeFilterDropdownProps) {
  const BASE_URL = usePathname() // Get the current pathname = '/search/anime/top-100'
  const BASE_TYPE = type.toLowerCase() // Lowercase base = 'order_by', 'sort', 'type'
  const searchParams = useSearchParams() // Get the query parameters from the URL

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <p className="flex min-w-full items-center justify-between">
            <>
              <span className="text-sm capitalize text-muted-foreground">
                {calculatePlaceholderText(searchParams, BASE_TYPE)}
              </span>
              <CaretSortIcon />
            </>
          </p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-h-fit w-[200px] 2xl:w-[230px]">
        <DropdownMenuGroup>
          {scrollable ? (
            <ScrollArea className="h-64 pr-4">
              {data.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <a
                    href={`${BASE_URL}/?${createQueryString(
                      BASE_TYPE,
                      item.toString().toLowerCase(),
                      searchParams,
                      ANIME_MAIN_GENRES_DATA
                    )}`}
                    className="cursor-pointer px-3 capitalize text-muted-foreground  transition-colors hover:text-foreground"
                  >
                    {renameParameters(item)}
                  </a>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          ) : (
            data.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <a
                  href={`${BASE_URL}/?${createQueryString(
                    BASE_TYPE,
                    item.toString().toLowerCase(),
                    searchParams,
                    ANIME_MAIN_GENRES_DATA
                  )}`}
                  className="cursor-pointer px-3 capitalize text-muted-foreground  transition-colors hover:text-foreground"
                >
                  {renameParameters(item)}
                </a>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
