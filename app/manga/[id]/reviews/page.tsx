import { NoDataFound } from "@/components/layout/no-data"
import { getIndividualMangaReviews } from "@/lib/fetchJikan"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
import { MangaReviewContainer } from "@/components/manga/single/reviews/manga-reviews-"

export default async function StaffPage({ params }: { params: { id: string } }) {
  const { data: reviews } = await getIndividualMangaReviews(params)

  return (
    <>
      {reviews.length > 0 ? (
        <Suspense fallback={<Loading />}>
          <MangaReviewContainer reviews={reviews} params={params} />
        </Suspense>
      ) : (
        <NoDataFound type={"reviews"} />
      )}
    </>
  )
}
