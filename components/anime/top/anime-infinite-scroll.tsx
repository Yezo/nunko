"use client"

import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { AnimeCard } from "@/components/anime/top/anime-card"
import { useIsVisible } from "@/hooks/useIsVisible"
import { SearchParams } from "@/lib/utils"
import { ITopAnimeData } from "@/types/anime/type-top-anime"
import { useSearchParams } from "next/navigation"
import { getAllAnime } from "@/lib/fetchServer"
import { UpdateIcon } from "@radix-ui/react-icons"

type AnimeInfiniteScrollingProps = {
  initialData: ITopAnimeData[]
  searchParams: SearchParams
}
export const AnimeInfiniteScrolling = ({
  initialData,
  searchParams,
}: AnimeInfiniteScrollingProps) => {
  //States
  const [anime, setAnime] = useState(initialData)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const ref = useRef(null)
  const visible = useIsVisible(ref)
  const params = useSearchParams()
  const query = params.get("q") ?? ""

  //We fetch more data whenever the spinner comes into view
  const loadMoreAnime = useCallback(async () => {
    //Increase the page count by one each time this function gets called
    const next = page + 1
    //Check if there are more pages in 'animes.pagination.has_next_page'
    if (hasNextPage) {
      const animes = await getAllAnime(searchParams, next, query)
      //Check if there's data and if there is another page
      if (animes.data?.length && hasNextPage) {
        //Increase the page and combine new data with previously fetched data
        setPage(next)
        setAnime((prev: ITopAnimeData[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...animes.data,
        ])
        animes.pagination.has_next_page ? setHasNextPage(true) : setHasNextPage(false)
      }
    }
  }, [page, searchParams, hasNextPage, query])

  useEffect(() => {
    //Whenever the spinner is visible, then we should fetch more data
    if (visible) {
      loadMoreAnime()
    }
  }, [visible, loadMoreAnime])

  useEffect(() => {
    //If you search through input filter, it will redirect you to a new page but it shows old data
    //To prevent this, we need to update the state with the fresh data given by 'initialData'
    //Thus, if query parameter, we should reset the 'anime' state back to initialData
    if (query) {
      setAnime(initialData)
    }
  }, [query, initialData])

  return (
    <div>
      <section className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {anime?.map((item) => (
          <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
            <AnimeCard key={item.mal_id} data={item} />
          </Suspense>
        ))}
      </section>

      <div ref={ref} className="grid place-items-center pb-16 pt-8">
        {anime.length > 18 && hasNextPage ? (
          <UpdateIcon className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : null}
      </div>
    </div>
  )
}
