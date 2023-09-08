import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { AnimeLinksHeader } from "@/components/anime/single/anime-links-header"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
import { getIndividualAnime } from "@/lib/fetchJikan"
import { AnimeDetailsContainer } from "@/components/anime/single/details/details-container"
import { FeatureContainer } from "@/components/anime/single/features/feature-container"
import Image from "next/image"

export default async function IndividualAnimePageLayout({
  params,
  children,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  const { data } = await getIndividualAnime(params)

  return (
    <div className="flex">
      <Sidebar />

      <main className="container mx-auto flex-1 px-4">
        <div className="flex flex-col-reverse justify-between border-b py-12 md:flex-row lg:py-20">
          <div className="flex flex-col justify-center gap-8">
            <div className="space-y-2">
              <h1 className="mt-8 font-domine text-2xl font-medium md:mt-0">{data?.title}</h1>
              <div className="text-sm text-muted-foreground">
                {data?.type} • {data?.status}
              </div>
            </div>

            <FeatureContainer />
          </div>

          {data.images.webp.image_url && (
            <div className="relative h-60 w-full md:h-[295px] md:w-[215px]">
              <Image
                src={data.images.webp.image_url.toString()}
                alt={data.title?.toString()}
                fill
                className="h-full w-full rounded border object-cover object-center shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </div>

        <section className="flex flex-col gap-28 py-8 lg:flex-row">
          <div className="space-y-8 lg:basis-2/4 xl:basis-3/4">
            <AnimeLinksHeader id={params.id} />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>

          <AnimeDetailsContainer data={data} />
        </section>
      </main>
    </div>
  )
}
