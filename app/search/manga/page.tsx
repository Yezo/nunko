import { Dummy } from "@/components/dummy"
import { NoResults } from "@/components/layout/no-results"
import { MangaCard } from "@/components/manga/top/manga-card"
import { MangaSearchHeader } from "@/components/manga/top/manga-search-header"
import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { getAllManga } from "@/lib/fetchJikan"
import { SearchParams } from "@/lib/utils"
import { Suspense } from "react"

export default async function MangaSearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { data } = await getAllManga(searchParams)

  return (
    <div className="flex">
      <Sidebar />
      <Dummy data={data} />
      <main className="container mx-auto flex-1 px-4">
        <MangaSearchHeader />

        {data.length > 0 ? (
          <section className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {data.map((item) => (
              <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
                <MangaCard key={item.mal_id} data={item} />
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
