import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { BookmarkSVG, CheckmarkSVG, EyeSVG, ReadingBookSVG } from "@/lib/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AnimeCast } from "@/components/anime/anime-cast"
import { formatDuration } from "@/lib/utils"
import Image from "next/image"
import Jikan from "jikan4.js"

export default async function IndividualAnimePage({ params }: { params: { id: string } }) {
  const parsedID = parseInt(params.id)
  const client = new Jikan.Client()

  const getData = client.anime.get(parsedID)
  const getCharacters = client.anime.getCharacters(parsedID)
  const getRecommendations = client.anime.getRecommendations(parsedID)
  const getEpisodes = client.anime.getEpisodes(parsedID)
  const getStaff = client.anime.getStaff(parsedID)

  // const getCocks = client.anime.search("", { score: 5.74, genres: [1] })

  interface PromiseFulfilledResult<T> {
    status: "fulfilled"
    value: T
  }

  const [dataPromise, characterPromise, recommendationsPromise, episodesPromise, staffPromise] =
    (await Promise.allSettled([
      getData,
      getCharacters,
      getRecommendations,
      getEpisodes,
      getStaff,
    ])) as [
      PromiseFulfilledResult<Jikan.Anime | undefined>,
      PromiseFulfilledResult<Jikan.AnimeCharacterReference[] | undefined>,
      PromiseFulfilledResult<Jikan.AnimeRecommendation[] | undefined>,
      PromiseFulfilledResult<Jikan.AnimePartialEpisode[] | undefined>,
      PromiseFulfilledResult<Jikan.AnimeStaffReference[] | undefined>
    ]

  const { value: data } = dataPromise
  const { value: characters } = characterPromise
  const { value: recommendations } = recommendationsPromise
  const { value: episodes } = episodesPromise
  const { value: staff } = staffPromise

  return (
    <div className="flex">
      <Sidebar />

      <main className="container mx-auto flex-1 px-4">
        <div className="flex flex-col-reverse justify-between border-b py-12 md:flex-row lg:py-20">
          <div className="flex flex-col justify-center gap-8">
            <div className="space-y-2">
              <h1 className="mt-8 font-domine text-2xl font-medium md:mt-0">
                {data?.title.default}
              </h1>
              <div className="text-sm text-muted-foreground">
                {data?.type} •{" "}
                {data?.airInfo.status.toLowerCase() === "finishedairing"
                  ? "Finished Airing"
                  : data?.airInfo.status}
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
            {data && data.image.webp && data.image.webp.default && (
              <Image
                src={data.image.webp.default.toString()}
                alt={data.title.default}
                fill
                className="h-full w-full object-cover object-center shadow-xl ring-1 ring-[#131314]/80 dark:ring-foreground/80"
              />
            )}
          </div>
        </div>

        <section className="flex flex-col gap-28 py-8 lg:flex-row">
          <div className="space-y-12 lg:basis-2/4 xl:basis-3/4">
            <Tabs defaultValue="description">
              <TabsList className="bg-background shadow-none">
                {data?.synopsis ? (
                  <TabsTrigger value="description" className="shadow-none ring-0">
                    Description
                  </TabsTrigger>
                ) : null}
                {data?.background ? (
                  <TabsTrigger value="password" className="shadow-none ring-0">
                    Additional Info
                  </TabsTrigger>
                ) : null}
                <TabsTrigger value="characters" className="shadow-none ring-0">
                  Characters
                </TabsTrigger>
                <TabsTrigger value="reviews" className="shadow-none ring-0">
                  <div className="flex gap-2">Reviews</div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 text-sm leading-7">
                {data?.synopsis}
              </TabsContent>
              <TabsContent value="password" className="mt-4 text-sm leading-7">
                {data?.background}
              </TabsContent>
              {characters && (
                <TabsContent value="characters" className="mt-4 text-sm leading-7">
                  <AnimeCast data={characters.slice(0, 50)} />
                </TabsContent>
              )}
              <TabsContent value="reviews" className="mt-4 text-sm leading-7">
                reviews here
              </TabsContent>
            </Tabs>

            {recommendations && recommendations.length > 0 ? (
              <section className="space-y-4">
                <h2>Recommendations</h2>
                <div className="grid grid-cols-3 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
                  {recommendations.slice(0, 6).map((item) => (
                    <div key={item.entry.id} className="space-y-1">
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
                        )}
                      <p className="max-w-[20ch] text-xs font-medium text-muted-foreground">
                        {item.entry.title}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="space-y-12 lg:basis-2/4 xl:basis-1/4">
            <div>
              <h2 className="mb-4 text-[15px]">Details</h2>
              <div className="space-y-4 rounded-lg border py-6 text-sm">
                {data?.score && data.score > 0 && (
                  <AnimeListDetailItem title="Score">{data.score}</AnimeListDetailItem>
                )}
                {data?.rank && <AnimeListDetailItem title="Rank">#{data.rank}</AnimeListDetailItem>}
                {data?.popularity && (
                  <AnimeListDetailItem title="Popularity">#{data.popularity}</AnimeListDetailItem>
                )}

                {data?.favorites ? (
                  <AnimeListDetailItem title="Favorites">
                    {data.favorites.toLocaleString("en-US")}
                  </AnimeListDetailItem>
                ) : null}

                <Separator />

                {data?.title && (
                  <AnimeListDetailItem title="Romaji">{data.title.default}</AnimeListDetailItem>
                )}

                {data?.title.english && (
                  <AnimeListDetailItem title="English">{data.title.english}</AnimeListDetailItem>
                )}

                {data?.title.japanese && (
                  <AnimeListDetailItem title="Japanese">{data.title.japanese}</AnimeListDetailItem>
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
                {data?.airInfo.status && (
                  <AnimeListDetailItem title="Status">{data.airInfo.status}</AnimeListDetailItem>
                )}

                {data?.episodes && (
                  <AnimeListDetailItem title="Episodes">{data.episodes}</AnimeListDetailItem>
                )}
                {data?.duration && (
                  <AnimeListDetailItem title="Duration">
                    {formatDuration(data.duration)}
                  </AnimeListDetailItem>
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
