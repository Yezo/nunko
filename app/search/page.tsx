import { AnimeCard } from "@/components/anime/top/anime-card"
import { NoResults } from "@/components/layout/no-results"
import { MangaCard } from "@/components/manga/top/manga-card"
import { SearchInput } from "@/components/search/search-input"
import { getSearchAnime, getSearchManga } from "@/lib/fetchJikan"
import { Suspense } from "react"
import { CaretRightIcon } from "@radix-ui/react-icons"
import { Main } from "@/components/layout/main"
import Link from "next/link"

export const metadata = {
  title: "Search",
  description: "Nunko - Search",
}

type SearchQueryPageProps = {
  searchParams: { q: string }
}
export default async function SearchQueryPage({ searchParams }: SearchQueryPageProps) {
  const query = searchParams.q
  const { data: animeData } = await getSearchAnime(query)
  const { data: mangaData } = await getSearchManga(query)

  return (
    <Main>
      <SearchInput />
      <div className="flex flex-col gap-16 lg:flex-row">
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
              <section className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
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
              <section className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
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
    </Main>
  )
}
