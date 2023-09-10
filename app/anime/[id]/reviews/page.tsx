import { ReviewContainer } from "@/components/anime/single/reviews/review-container"
import { NoDataFound } from "@/components/layout/no-data"
import { getIndividualAnimeReviews } from "@/lib/fetchJikan"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"

export default async function StaffPage({ params }: { params: { id: string } }) {
  const { data: reviews } = await getIndividualAnimeReviews(params)

  return (
    <>
      {reviews.length > 0 ? (
        <Suspense fallback={<Loading />}>
          <ReviewContainer reviews={reviews} params={params} />
        </Suspense>
      ) : (
        <NoDataFound type={"reviews"} />
      )}
    </>
  )
}
