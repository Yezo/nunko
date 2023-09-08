import { AnimeCard } from "@/components/anime/anime-card"
import { AnimeSearchHeader } from "@/components/anime/anime-search-header"
import { NoResults } from "@/components/layout/no-results"
import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { getAllAnime, getAllAnimeProp } from "@/lib/fetchJikan"
import { Suspense } from "react"

export default async function AnimePage({ searchParams }: { searchParams: getAllAnimeProp }) {
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
