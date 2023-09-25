import { AnimeInfiniteScrolling } from "@/components/anime/top/anime-infinite-scroll"
import { AnimeSearchHeader } from "@/components/anime/top/anime-search-header"
import { Main } from "@/components/layout/main"
import { NoResults } from "@/components/layout/no-results"
import { getAllAnime } from "@/lib/fetchJikan"
import { SearchParams } from "@/lib/utils"

export const metadata = {
  title: "Search Anime",
  description: "Nunko - Search Anime",
}

export default async function AnimePage({ searchParams }: { searchParams: SearchParams }) {
  const query = searchParams.q || ""
  const { data } = await getAllAnime(searchParams, 1, query)

  return (
    <Main>
      <AnimeSearchHeader />

      {data.length > 0 ? (
        <AnimeInfiniteScrolling searchParams={searchParams} initialData={data} />
      ) : (
        <NoResults />
      )}
    </Main>
  )
}
