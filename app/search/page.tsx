import { AnimeCard } from "@/components/anime/top/anime-card"
import { Dummy } from "@/components/dummy"
import { NoResults } from "@/components/layout/no-results"
import { MangaCard } from "@/components/manga/top/manga-card"
import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { SearchInput } from "@/components/search/search-input"
import { getSearchAnime, getSearchManga } from "@/lib/fetchJikan"
import { Suspense } from "react"
import { CaretRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Loading } from "@/components/ui/loading"

type SearchQueryPageProps = {
  searchParams: { q: string }
}
export default async function SearchQueryPage({ searchParams }: SearchQueryPageProps) {
  const query = searchParams.q
  const { data: animeData } = await getSearchAnime(query)
  const { data: mangaData } = await getSearchManga(query)

  //todo figure out suspense for this shit?
  //prob have to separate components and have them fetch data themselves?
  return (
    <div className="flex">
      <Sidebar />

      <main className="container mx-auto flex-1 px-4">
        <SearchInput />
        <div className="flex gap-20">
          <Suspense fallback={<Loading></Loading>}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between ">
                <h2 className="text-lg font-medium">Anime</h2>
                <Link
                  href={`/search/anime?q=${query}`}
                  className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground/90"
                >
                  <span>View all anime results</span> <CaretRightIcon />
                </Link>
              </div>
              {animeData.length > 0 ? (
                <>
                  <Dummy data={animeData} />
                  <section className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {animeData.slice(0, 6).map((item) => (
                      <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
                        <AnimeCard key={item.mal_id} data={item} />
                      </Suspense>
                    ))}
                  </section>
                  <Link
                    href={`/search/anime?q=${query}`}
                    className="mt-4 grid min-w-full place-items-center rounded-md border bg-border/90 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-border hover:text-foreground"
                  >
                    View all anime results
                  </Link>
                </>
              ) : (
                <NoResults />
              )}
            </div>
          </Suspense>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-medium">Manga</h2>
              <Link
                href={`/search/manga?q=${query}`}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground/90"
              >
                <span>View all manga results</span> <CaretRightIcon />
              </Link>
            </div>
            {mangaData.length > 0 ? (
              <>
                <Dummy data={mangaData} />
                <section className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {mangaData.slice(0, 6).map((item) => (
                    <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
                      <MangaCard key={item.mal_id} data={item} />
                    </Suspense>
                  ))}
                </section>
                <Link
                  href={`/search/manga?q=${query}`}
                  className="mt-4 grid min-w-full place-items-center rounded-md border bg-border/90 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-border hover:text-foreground"
                >
                  View all manga results
                </Link>
              </>
            ) : (
              <NoResults />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}