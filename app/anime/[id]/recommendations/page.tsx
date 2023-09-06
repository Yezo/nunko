import Jikan from "jikan4.js"
import Link from "next/link"
import Image from "next/image"

export default async function RecommendationsPage({ params }: { params: { id: string } }) {
  //States
  const parsedID = parseInt(params.id)
  const client = new Jikan.Client({ secure: true })
  const recommendations = await client.anime.getRecommendations(parsedID)

  return (
    <>
      {recommendations && recommendations.length > 0 ? (
        <section className="space-y-4">
          <div className="grid grid-cols-3 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
            {recommendations.slice(0, 18).map((item) => (
              <div key={item.entry.id} className="space-y-1">
                <Link href={`/anime/${item.entry.id}`}>
                  {item &&
                    item.entry &&
                    item.entry.image.webp &&
                    item.entry.image &&
                    item.entry.image.webp.large && (
                      <Image
                        src={item.entry.image.webp.large.toString()}
                        alt={item.entry.title}
                        width={500}
                        height={500}
                        className="h-[225px] w-[150px] rounded-lg object-cover object-top shadow-md ring-1 ring-muted-foreground/20"
                      />
                    )}{" "}
                </Link>
                <Link
                  href={`/anime/${item.entry.id}`}
                  className="max-w-[20ch] text-xs font-medium text-muted-foreground"
                >
                  {item.entry.title}
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}
