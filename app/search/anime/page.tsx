import { AnimeInfiniteScrolling } from "@/components/anime/top/anime-infinite-scroll"
import { AnimeSearchHeader } from "@/components/anime/top/anime-search-header"
import { Main } from "@/components/layout/main"
import { NoResults } from "@/components/layout/no-results"
import { getAllAnime } from "@/lib/fetchJikan"
import { SearchParams } from "@/lib/utils"

export default async function AnimePage({ searchParams }: { searchParams: SearchParams }) {
  const query = searchParams.q || ""
  const { data } = await getAllAnime(searchParams, 1, query)

  return (
    <Main>
      <AnimeSearchHeader />

      {/* {data.length > 0 ? (
          <>
            <section className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {data.map((item) => (
                <Suspense key={item.mal_id} fallback={<div>Loading...</div>}>
                  <AnimeCard key={item.mal_id} data={item} />
                </Suspense>
              ))}
            </section>
            <LoadMore searchParams={searchParams} data={data} />
          </>
        ) : (
          <NoResults />
        )} */}

      {data.length > 0 ? (
        <>
          <AnimeInfiniteScrolling searchParams={searchParams} initialData={data} />
        </>
      ) : (
        <NoResults />
      )}
    </Main>
  )
}
