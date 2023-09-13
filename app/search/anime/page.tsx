import { AnimeCard } from "@/components/anime/top/anime-card"
import { AnimeSearchHeader } from "@/components/anime/top/anime-search-header"
import { NoResults } from "@/components/layout/no-results"
import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { getAllAnime } from "@/lib/fetchJikan"
import { SearchParams } from "@/lib/utils"
import { Suspense } from "react"

export default async function AnimePage({ searchParams }: { searchParams: SearchParams }) {
  const { data } = await getAllAnime(searchParams)

  return (
    <div className="flex">
      <Sidebar />

      <main className="container mx-auto flex-1 px-4">
        <AnimeSearchHeader />

        {data.length > 0 ? (
          <section className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {data.map((item) => (
              <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
                <AnimeCard key={item.mal_id} data={item} />
              </Suspense>
            ))}
          </section>
        ) : (
          <NoResults />
        )}
      </main>
    </div>
  )
}
