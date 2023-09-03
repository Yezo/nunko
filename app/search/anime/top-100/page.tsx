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
  url.search = params.toString()
  let result = url.toString()
  return result
}

export default async function AnimePage({ searchParams }: { searchParams: IMinMax }) {
  const data = await getData(searchParams)
  const filtered = data.data.filter((item) => item.rank)
  console.log(filtered)
  return (
    <MainContainer>
      <AnimeSearchHeader />

      {data.data.length > 0 ? (
        data.data.map((item) => (
          <section
            className="relative grid grid-cols-1 sm:grid-cols-2 md:gap-8 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4"
            key={item.mal_id}
          >
            <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
              <AnimeCard key={item.mal_id} data={item} />
            </Suspense>
          </section>
        ))
      ) : (
        <div className="grid min-h-[25rem] place-items-center  xl:min-h-[35rem]">
          <p className="flex flex-col items-center justify-center gap-2 tracking-tight">
            <MagnifyingGlassIcon className="h-20 w-20" />
            <span className="text-xl font-medium">No Results</span>
            <span className="text-muted-foreground">
              We couldn't find what you were looking for.
            </span>
          </p>
        </div>
      )}
    </MainContainer>
  )
}
