const jikanjs = require("@mateoaranda/jikanjs")
import Link from "next/link"
import Image from "next/image"
import { Dummy } from "@/components/dummy"
import { IRecommendation } from "@/types/typeRecommendations"

export async function getData(id: string) {
  try {
    const { data }: IRecommendation = await jikanjs.loadAnime(id, "recommendations")
    return data
  } catch (error) {
    return "error"
  }
}
export default async function RecommendationsPage({ params }: { params: { id: string } }) {
  const recommendations = await getData(params.id)

  return (
    <>
      {typeof recommendations === "string" ? (
        <div className="flex">
          <div className="container mx-auto flex-1 px-4">There was an error.</div>
        </div>
      ) : (
        <>
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
                        className="h-[225px] w-[150px] rounded-lg object-cover object-top shadow-md ring-1 ring-muted-foreground/20"
                      />
                    )}{" "}
                  </Link>
                  <Link
                    href={`/anime/${item.entry.mal_id}`}
                    className="max-w-[20ch] text-xs font-medium text-muted-foreground"
                  >
                    {item.entry.title}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}
