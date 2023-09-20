import { IndividualLinksHeader } from "@/components/shared/individual-links-header"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
import { getIndividualAnime, handleResponseError } from "@/lib/fetchJikan"
import { AnimeDetailsContainer } from "@/components/anime/single/details/details-container"
import { FeatureContainer } from "@/components/anime/single/features/feature-container"
import { Main } from "@/components/layout/main"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { editAnimeStatus } from "@/lib/actions/editAnimeStatus"
import Image from "next/image"

export interface IAnimes {
  animes: Anime[]
}

export interface Anime {
  _id: string
  type: string
  mal_id: number
  title: string
  status: string
  score: string
  progress: string
  user_id: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

async function fetchUser(id: string | undefined): Promise<IAnimes> {
  const url = `http://nunko-amber.vercel.app/api/animes/${id}`
  const res = await fetch(url)
  handleResponseError(res)
  return res.json()
}

export default async function IndividualAnimePageLayout({
  params,
  children,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const { data } = await getIndividualAnime(params)
  const userData = await fetchUser(session?.user?.id)

  async function editAnimeStatusAction(status: string, animeID: string) {
    "use server"
    try {
      await editAnimeStatus(status, animeID, session?.user?.id)
    } catch (e) {
      console.log("There was an error.")
    }
  }

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

          <FeatureContainer data={data} user={userData} editAnimeStatus={editAnimeStatusAction} />
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
          <IndividualLinksHeader id={params.id} type="anime" />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>

        <AnimeDetailsContainer data={data} />
      </section>
    </Main>
  )
}
