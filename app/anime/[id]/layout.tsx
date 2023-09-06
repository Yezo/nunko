import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { BookmarkSVG, CheckmarkSVG, EyeSVG, ReadingBookSVG } from "@/lib/icons"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { AnimeLinksHeader } from "@/components/anime/anime-links-header"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
const jikanjs = require("@mateoaranda/jikanjs")
import { IIndividualAnime } from "@/types/typeIndividualAnime"

type PromiseFulfilledResult<T> = {
  status: "fulfilled"
  value: T
}

export async function getData(id: string) {
  try {
    const { data }: IIndividualAnime = await jikanjs.loadAnime(id)
    return data
  } catch (error) {
    return "error"
  }
}

export default async function IndividualAnimePageLayout({
  params,
  children,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  //States
  // const parsedID = parseInt(params.id)
  // const { data }: IIndividualAnime = await jikanjs.loadAnime(parsedID)
  const data = await getData(params.id)

  // const client = new Jikan.Client({ secure: true })

  //Initialize promises
  // const getData = client.anime.get(parsedID)
  // const getRecommendations = client.anime.getRecommendations(parsedID)

  //Fetch data
  // const [dataPromise, recommendationsPromise] = (await Promise.allSettled([
  //   getData,
  //   getRecommendations,
  // ])) as [
  //   PromiseFulfilledResult<Jikan.Anime | undefined>,
  //   PromiseFulfilledResult<Jikan.AnimeRecommendation[] | undefined>
  // ]

  //Destructure into usable variables
  // const { value: data } = dataPromise
  // const { value: recommendations } = recommendationsPromise

  return (
    <>
      {typeof data === "string" ? (
        <div className="flex">
          <Sidebar />

          <main className="container mx-auto flex-1 px-4">There was an error.</main>
        </div>
      ) : (
        <div className="flex">
          <Sidebar />

          <main className="container mx-auto flex-1 px-4">
            <div className="flex flex-col-reverse justify-between border-b py-12 md:flex-row lg:py-20">
              <div className="flex flex-col justify-center gap-8">
                <div className="space-y-2">
                  <h1 className="mt-8 font-domine text-2xl font-medium md:mt-0">{data.title}</h1>
                  <div className="text-sm text-muted-foreground">
                    {data?.type} • {data?.status}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <AnimeListFeatureButton title="Add entry">
                    <ReadingBookSVG />
                  </AnimeListFeatureButton>

                  <AnimeListFeatureButton title="Watching">
                    <EyeSVG />
                  </AnimeListFeatureButton>

                  <AnimeListFeatureButton title="Watch Later">
                    <BookmarkSVG />
                  </AnimeListFeatureButton>

                  <AnimeListFeatureButton title="Completed">
                    <CheckmarkSVG />
                  </AnimeListFeatureButton>
                </div>
              </div>
              <div className="relative h-60 w-full md:h-[240px] md:w-[160px]">
                {data && data.images.webp && data.title && (
                  <Image
                    src={data.images.webp.image_url.toString()}
                    alt={data.title?.toString()}
                    fill
                    className="h-full w-full object-cover object-center shadow-xl ring-1 ring-[#131314]/80 dark:ring-foreground/80"
                  />
                )}
              </div>
            </div>

            <section className="flex flex-col gap-28 py-8 lg:flex-row">
              <div className="space-y-12 lg:basis-2/4 xl:basis-3/4">
                {/* {data?.synopsis && data?.synopsis.length > 0 ? (
              <section className="space-y-4">
                <h2>Description</h2>
                <div className="mt-4 text-sm leading-7">{data?.synopsis}</div>
              </section>
            ) : null} */}

                <section>
                  <AnimeLinksHeader id={params.id} />

                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </section>
              </div>

              <div className="space-y-12 lg:basis-2/4 xl:basis-1/4">
                <div>
                  <h2 className="mb-4 text-[15px]">Details</h2>
                  <div className="space-y-4 rounded-lg border py-6 text-sm">
                    {data?.score && data.score > 0 && (
                      <AnimeListDetailItem title="Score">{data.score}</AnimeListDetailItem>
                    )}
                    {data?.rank && (
                      <AnimeListDetailItem title="Rank">
                        #{data.rank.toLocaleString("en-US")}
                      </AnimeListDetailItem>
                    )}
                    {data?.popularity && (
                      <AnimeListDetailItem title="Popularity">
                        #{data.popularity.toLocaleString("en-US")}
                      </AnimeListDetailItem>
                    )}

                    {data?.favorites ? (
                      <AnimeListDetailItem title="Favorites">
                        {data.favorites.toLocaleString("en-US")}
                      </AnimeListDetailItem>
                    ) : null}

                    <Separator />

                    {data?.title && (
                      <AnimeListDetailItem title="Romaji">{data.title}</AnimeListDetailItem>
                    )}

                    {data?.title_english && (
                      <AnimeListDetailItem title="English">
                        {data.title_english}
                      </AnimeListDetailItem>
                    )}

                    {data?.title_japanese && (
                      <AnimeListDetailItem title="Japanese">
                        {data.title_japanese}
                      </AnimeListDetailItem>
                    )}

                    {data?.genres && data?.genres.length > 0 && (
                      <AnimeListDetailItem title="Genres">
                        {data.genres.map((item, index: number) => (
                          <div key={index}>{item.name}</div>
                        ))}
                      </AnimeListDetailItem>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="mb-4 text-[15px]">Broadcast</h2>
                  <div className="space-y-4 rounded-lg border py-6 text-sm">
                    {data?.type && (
                      <AnimeListDetailItem title="Format">{data.type}</AnimeListDetailItem>
                    )}
                    {data?.status && (
                      <AnimeListDetailItem title="Status"> {data?.status}</AnimeListDetailItem>
                    )}

                    {data?.episodes && (
                      <AnimeListDetailItem title="Episodes">{data.episodes}</AnimeListDetailItem>
                    )}
                    {data?.duration && (
                      <AnimeListDetailItem title="Duration">{data.duration}</AnimeListDetailItem>
                    )}
                    {data?.rating && (
                      <AnimeListDetailItem title="Rating">{data.rating}</AnimeListDetailItem>
                    )}
                    {/* {data?.airInfo && data.aired.prop.from.day && (
                  <AnimeListDetailItem title="Start Date">
                    {getMonthName(data.aired.prop.from.month) +
                      " " +
                      data.aired.prop.from.day +
                      ", " +
                      data.aired.prop.from.year}
                  </AnimeListDetailItem>
                )}
                {data?.aired && data.aired.prop.to.day && (
                  <AnimeListDetailItem title="End Date">
                    {getMonthName(data.aired.prop.to.month) +
                      " " +
                      data.aired.prop.to.day +
                      ", " +
                      data.aired.prop.to.year}
                  </AnimeListDetailItem>
                )} */}

                    {data?.season && (
                      <AnimeListDetailItem title="Season">{data.season}</AnimeListDetailItem>
                    )}

                    <Separator />

                    {data?.studios && data.studios.length > 0 && (
                      <AnimeListDetailItem title="Studios">
                        {data.studios.map((item, index) => (
                          <div key={index}>{item.name}</div>
                        ))}
                      </AnimeListDetailItem>
                    )}
                    {data?.producers && data.producers.length > 0 && (
                      <AnimeListDetailItem title="Producers">
                        {data.producers.map((item, index) => (
                          <div key={index}>{item.name}</div>
                        ))}
                      </AnimeListDetailItem>
                    )}
                    {data?.licensors && data.licensors.length > 0 && (
                      <AnimeListDetailItem title="Licensors">
                        {data.licensors.map((item, index) => (
                          <div key={index}>{item.name}</div>
                        ))}
                      </AnimeListDetailItem>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  )
}

const AnimeListDetailItem = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="px-6">
      <div className="font-medium">{title}</div>
      <div className="capitalize text-muted-foreground">{children}</div>
    </div>
  )
}

const AnimeListFeatureButton = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  return (
    <div className="space-y-2">
      <button className="mx-auto rounded-lg border px-6 py-2 shadow-sm transition-colors duration-300 hover:bg-accent  md:px-8 md:py-3.5">
        {children}
      </button>
      <p className="text-center text-xs text-muted-foreground">{title}</p>
    </div>
  )
}
