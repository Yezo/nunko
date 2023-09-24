import { Anime, IAnimes } from "@/app/anime/[id]/layout"
import { IMangas, Manga } from "@/app/manga/[id]/layout"
import { Dummy } from "@/components/dummy"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { handleResponseError } from "@/lib/fetchJikan"
import { DesktopIcon, ImageIcon, PlayIcon, ReaderIcon } from "@radix-ui/react-icons"
import moment from "moment"
import Link from "next/link"

//Fetch to MongoDB and grab a list of all the user's anime entries
async function fetchUserAnimes(username: string | undefined): Promise<IAnimes> {
  const url = `http://nunko-amber.vercel.app/api/user/animelist/${username}`
  const res = await fetch(url, { cache: "no-store" })
  handleResponseError(res)
  return res.json()
}

//Fetch to MongoDB and grab a list of all the user's manga entries
async function fetchUserMangas(username: string | undefined): Promise<IMangas> {
  const url = `http://nunko-amber.vercel.app/api/user/mangalist/${username}`
  const res = await fetch(url, { cache: "no-store" })
  handleResponseError(res)
  return res.json()
}

export interface MixedData {
  _id: string
  type: string
  mal_id: number
  title: string
  status: string
  score: string
  username: string
  progress: string
  user_id: string
  image: string
  episodes?: number
  airingStatus?: string
  duration?: string
  airDate?: string
  createdAt: Date
  updatedAt: Date
  __v: number
  chapters?: number
  publishingStatus?: string
  volumes?: number
}

function sortByUpdatedDate(data: MixedData[]) {
  // Sort the data array in ascending order based on the "updatedAt" property
  data.sort((a, b) => {
    const dateA = new Date(a.updatedAt)
    const dateB = new Date(b.updatedAt)

    // Compare the dates where '1, -1, 0' will return earliest date first
    if (dateA < dateB) return 1
    else if (dateA > dateB) return -1
    else return 0
  })

  return data
}

export default async function UserOverviewPage({ params }: { params: { username: string } }) {
  const { animes } = await fetchUserAnimes(params.username)
  const { mangas } = await fetchUserMangas(params.username)
  const data = animes && mangas && [...animes, ...mangas]

  const sortedData = sortByUpdatedDate(data)
  const animeTypes = ["TV", "Movie", "Special", "OVA", "ONA", "Music"]
  const mangaTypes = ["Manga", "Novel", "Light Novel", "One-Shot", "Doujin", "Manhwa", "Manhua"]

  function checkTypeOfAnime(type: string | undefined) {
    return type && animeTypes.includes(type)
  }

  function checkTypeOfManga(type: string | undefined) {
    return type && mangaTypes.includes(type)
  }

  function sumProgress(data: Anime[] | Manga[]): number {
    let totalProgress = 0
    for (const item of data) {
      // Assuming 'progress' is a string containing numeric values
      const progressValue = parseInt(item.progress, 10)
      if (!isNaN(progressValue)) {
        totalProgress += progressValue
      }
    }
    return totalProgress
  }

  function handleAnimeActions(data: MixedData | undefined) {
    if (!data) return null

    if (checkTypeOfAnime(data.type)) {
      if (data.status === "Completed") return "Finished watching"
      if (data.status === "Planned") return "Plans to watch"
      if (data.status === "Dropped") return "Dropped the series"
      if (data.status === "Watching") return `Watched episode ${data.progress} of`
      if (data.status === "Paused") return `Paused on episode ${data.progress} of`
    }

    if (checkTypeOfManga(data.type)) {
      if (data.status === "Completed") return "Finished reading"
      if (data.status === "Planned") return "Plans to read"
      if (data.status === "Dropped") return "Dropped the series"
      if (data.status === "Reading") return `Read chapter ${data.progress} of`
      if (data.status === "Paused") return `Paused on chapter ${data.progress} of`
    }
    return null
  }

  return (
    <>
      <Dummy data={sortedData} />

      <div className="flex flex-col gap-8">
        <section className="basis-2/5">
          <h2 className="mb-4 text-[15px] font-medium">Stats</h2>

          {sortedData.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-1  md:grid-cols-3 lg:grid-cols-4">
                <StatsCard title="Total anime" value={animes.length}>
                  <DesktopIcon className="h-5 w-5" />
                </StatsCard>
                <StatsCard title="Episodes" value={sumProgress(animes)}>
                  <PlayIcon className="h-5 w-5" />
                </StatsCard>
                <StatsCard title="Total manga" value={mangas.length}>
                  <ImageIcon className="h-5 w-5" />
                </StatsCard>
                <StatsCard title="Chapters" value={sumProgress(mangas)}>
                  <ReaderIcon className="h-5 w-5" />
                </StatsCard>
              </div>
            </>
          ) : null}
        </section>
        <section className="basis-3/5">
          <h2 className="mb-4 text-[15px] font-medium">Activity</h2>
          {sortedData.length > 0 ? (
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {sortedData.map((item) => {
                const date = moment(item.updatedAt).fromNow()

                return (
                  <div
                    key={item.mal_id}
                    className="flex items-center gap-4 rounded border px-4 py-6"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="text-sm text-muted-foreground">
                      <div>
                        {handleAnimeActions(item)}{" "}
                        <Link
                          href={`/${checkTypeOfAnime(item.type) ? "anime" : "manga"}/${
                            item.mal_id
                          }`}
                          className="font-medium text-foreground transition-colors hover:text-blue-500"
                        >
                          {item.title}
                        </Link>
                      </div>
                      <div className="first-letter:capitalize">{date}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="mt-8 grid min-h-[300px] place-items-center rounded border">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-medium tracking-tight text-foreground">
                    No activity!
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Try adding an anime or manga to your list.
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

const StatsCard = ({
  value,
  title,
  children,
}: {
  value: number
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-4 rounded-md border px-4 py-6">
      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-md">
        <span className="grid aspect-square h-full w-full place-items-center border border-foreground/[.01] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-100 via-gray-200 to-gray-300 text-foreground/60 shadow-sm dark:border-foreground/[0.05] dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-gray-900 dark:to-gray-800 dark:text-slate-300 ">
          {children}
        </span>
      </div>
      <div className="flex flex-col ">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-lg font-medium text-foreground">{value}</div>
      </div>
    </div>
  )
}
