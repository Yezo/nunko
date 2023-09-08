import { getIndividualAnimeRecommendations } from "@/lib/fetchJikan"
import Link from "next/link"
import Image from "next/image"
import { NoDataFound } from "@/components/layout/no-data"

export default async function RecommendationsPage({ params }: { params: { id: string } }) {
  const { data: recommendations } = await getIndividualAnimeRecommendations(params)

  return (
    <>
      {recommendations.length > 0 ? (
        <section className="space-y-4">
          <div className="grid grid-cols-3 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
            {recommendations.slice(0, 18).map((item) => (
              <div key={item.entry.mal_id} className="space-y-1">
                <Link href={`/anime/${item.entry.mal_id}`}>
                  {item && (
                    <Image
                      src={item.entry.images.webp.large_image_url.toString()}
                      alt={item.entry.title}
                      width={500}
                      height={500}
                      className="h-[230px] w-[150px] rounded border object-cover object-top shadow-md"
                    />
                  )}{" "}
                </Link>
                <Link href={`/anime/${item.entry.mal_id}`}>
                  <p className="max-w-[18ch] text-xs font-medium leading-5 tracking-tight text-muted-foreground">
                    {item.entry.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <NoDataFound type={"recommendations"} />
      )}
    </>
  )
}
