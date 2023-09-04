import { AnimeCard } from "@/components/anime/anime-card"
import { AnimeSearchHeader } from "@/components/anime/anime-search-header"
import { MainContainer } from "@/components/layout/main"
import { ITopAnime } from "@/types/typeTopAnime"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import React, { Suspense } from "react"

interface IMinMax {
  limit?: string
  page?: string
  sfw?: boolean
  rating?: string
  filter?: string
  type?: string
  order_by?: string
  sort?: string
  score?: string
  min_score?: string
  start_date?: string
  end_date?: string
  genres?: string
}

async function getData(searchParams: IMinMax): Promise<ITopAnime> {
  const url = transformString(searchParams)
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const transformString = (searchParams: IMinMax) => {
  let url = new URL("https://api.jikan.moe/v4/anime")
  let params = url.searchParams

  //Set new value
  if (searchParams.limit) params.set("limit", searchParams.limit)
  if (searchParams.page) params.set("page", searchParams.page)
  if (searchParams.sfw) params.set("sfw", "true")
  if (searchParams.rating) params.set("rating", searchParams.rating)
  if (searchParams.filter) params.set("filter", searchParams.filter)
  if (searchParams.type) params.set("type", searchParams.type)
  if (searchParams.order_by) params.set("order_by", searchParams.order_by)
  if (searchParams.sort) params.set("sort", searchParams.sort)
  if (searchParams.score) params.set("score", searchParams.score)
  if (searchParams.min_score) params.set("min_score", searchParams.min_score)
  if (searchParams.start_date) params.set("start_date", searchParams.start_date)
  if (searchParams.end_date) params.set("end_date", searchParams.end_date)
  if (searchParams.genres) params.set("genres", searchParams.genres)
  url.search = params.toString()
  let result = url.toString()
  return result
}

export default async function AnimePage({ searchParams }: { searchParams: IMinMax }) {
  const data = await getData(searchParams)

  return (
    <MainContainer>
      <AnimeSearchHeader />

      {data.data.length > 0 ? (
        <section className="relative grid grid-cols-1 sm:grid-cols-2 md:gap-8 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {data.data.map((item) => (
            <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
              <AnimeCard key={item.mal_id} data={item} />
            </Suspense>
          ))}
        </section>
      ) : (
        <div className="grid min-h-[25rem] place-items-center  xl:min-h-[35rem]">
          <p className="flex flex-col items-center justify-center gap-2 tracking-tight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
            >
              <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
              <path d="M4 6h.01" />
              <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
              <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
              <path d="M12 18h.01" />
              <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
              <circle cx="12" cy="12" r="2" />
              <path d="m13.41 10.59 5.66-5.66" />
            </svg>
            <div className="space-y-1 text-center">
              <div className="text-lg font-medium">No results found</div>
              <div className="text-sm text-muted-foreground">
                We couldn't find what you were looking for.
              </div>
            </div>
          </p>
        </div>
      )}
    </MainContainer>
  )
}
