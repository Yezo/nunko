"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { calculatePlaceholderText, createQueryString, renameParameters } from "@/lib/utils-dropdown"
import {
  ANIME_MAIN_GENRES_ARR_DATA,
  ANIME_MAIN_GENRES_DATA,
} from "@/components/anime/top/anime-data"

type AnimeFilterDropdownProps = {
  title: string
  type: string
  data: string[] | number[]
  scrollable?: boolean
}

export function AnimeFilterDropdown({ title, type, data, scrollable }: AnimeFilterDropdownProps) {
  const BASE_URL = usePathname() // Get the current pathname = '/search/anime/top-100'
  const BASE_TYPE = type.toLowerCase() // Lowercase base = 'order_by', 'sort', 'type'
  const searchParams = useSearchParams() // Get the query parameters from the URL

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <p className="flex min-w-full items-center justify-between">
            <span className="text-xs font-semibold capitalize text-muted-foreground">
              {calculatePlaceholderText(searchParams, BASE_TYPE)}
            </span>
            <CaretSortIcon />
          </p>
        </Button>
      </DropdownMenuTrigger>

      {/* fix dropdown widths later */}
      <DropdownMenuContent className="min-h-fit w-[200px]">
        <DropdownMenuGroup>
          {scrollable ? (
            <ScrollArea className="h-64 pr-4">
              {data.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link
                    href={`${BASE_URL}/?${createQueryString(
                      BASE_TYPE,
                      item.toString().toLowerCase(),
                      searchParams,
                      ANIME_MAIN_GENRES_DATA
                    )}`}
                    className="cursor-pointer px-3 text-[0.8rem] capitalize text-muted-foreground  transition-colors hover:text-foreground"
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
                    item.toString().toLowerCase(),
                    searchParams,
                    ANIME_MAIN_GENRES_DATA
                  )}`}
                  className="cursor-pointer px-3 text-[0.8rem] capitalize text-muted-foreground  transition-colors hover:text-foreground"
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
