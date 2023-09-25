"use client"

import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { useIsVisible } from "@/hooks/useIsVisible"
import { SearchParams } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { getAllManga } from "@/lib/fetchServer"
import { MangaCard } from "@/components/manga/top/manga-card"
import { ITopManga } from "@/types/manga/type-manga-all"
import { UpdateIcon } from "@radix-ui/react-icons"

type MangaInfiniteScrollingProps = {
  initialData: ITopManga[]
  searchParams: SearchParams
}
export const MangaInfiniteScrolling = ({
  initialData,
  searchParams,
}: MangaInfiniteScrollingProps) => {
  //States
  const [manga, setManga] = useState(initialData)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const ref = useRef(null)
  const visible = useIsVisible(ref)
  const params = useSearchParams()
  const query = params.get("q") ?? ""

  //We fetch more data whenever the spinner comes into view
  const loadMoreManga = useCallback(async () => {
    //Increase the page count by one each time this function gets called
    const next = page + 1
    //Check if there are more pages in 'manga.pagination.has_next_page'
    if (hasNextPage) {
      const manga = await getAllManga(searchParams, next, query)
      //Check if there's data and if there is another page
      if (manga.data?.length && hasNextPage) {
        //Increase the page and combine new data with previously fetched data
        setPage(next)
        setManga((prev: ITopManga[] | undefined) => [...(prev?.length ? prev : []), ...manga.data])
        manga.pagination.has_next_page ? setHasNextPage(true) : setHasNextPage(false)
      }
    }
  }, [page, searchParams, hasNextPage, query])

  useEffect(() => {
    //Whenever the spinner is visible, then we should fetch more data
    if (visible) {
      loadMoreManga()
    }
  }, [visible, loadMoreManga])

  useEffect(() => {
    //If you search through input filter, it will redirect you to a new page but it shows old data
    //To prevent this, we need to update the state with the fresh data given by 'initialData'
    //Thus, if query parameter, we should reset the 'manga' state back to initialData
    if (query) {
      setManga(initialData)
    }
  }, [query, initialData])

  return (
    <div>
      <section className="relative grid grid-cols-2 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {manga?.map((item) => (
          <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
            <MangaCard key={item.mal_id} data={item} />
          </Suspense>
        ))}
      </section>

      <div ref={ref} className="grid place-items-center pb-16 pt-8">
        {manga.length > 18 && hasNextPage ? (
          <UpdateIcon className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : null}
      </div>
    </div>
  )
}
