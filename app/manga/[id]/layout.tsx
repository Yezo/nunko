import { IndividualLinksHeader } from "@/components/shared/individual-links-header"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
import { getIndividualManga } from "@/lib/fetchJikan"
import { FeatureContainer } from "@/components/anime/single/features/feature-container"
import { MangaDetailsContainer } from "@/components/manga/single/details/details-container"
import { Main } from "@/components/layout/main"
import Image from "next/image"

export default async function IndividualMangaPageLayout({
  params,
  children,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  const { data } = await getIndividualManga(params)

  return (
    <Main>
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

      <section className="flex flex-col gap-12 py-8 lg:flex-row xl:gap-28">
        <section className="space-y-8 lg:basis-2/4 xl:basis-3/4">
          <IndividualLinksHeader id={params.id} type="manga" />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>

        <MangaDetailsContainer data={data} />
      </section>
    </Main>
  )
}
