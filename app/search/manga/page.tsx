import { Main } from "@/components/layout/main"
import { NoResults } from "@/components/layout/no-results"
import { MangaInfiniteScrolling } from "@/components/manga/top/manga-infinite-scroll"
import { MangaSearchHeader } from "@/components/manga/top/manga-search-header"
import { getAllManga } from "@/lib/fetchJikan"
import { SearchParams } from "@/lib/utils"

export default async function MangaSearchPage({ searchParams }: { searchParams: SearchParams }) {
  const query = searchParams.q || ""
  const { data } = await getAllManga(searchParams, 1, query)

  return (
    <Main>
      <MangaSearchHeader />

      {data.length > 0 ? (
        <>
          <MangaInfiniteScrolling searchParams={searchParams} initialData={data} />
        </>
      ) : (
        <NoResults />
      )}
    </Main>
  )
}
