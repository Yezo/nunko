import { Anime } from "@/app/anime/[id]/layout"
import { Manga } from "@/app/manga/[id]/layout"
import { Dummy } from "@/components/dummy"
import { Footer } from "@/components/footer/footer"
import { Main } from "@/components/layout/main"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { handleResponseError } from "@/lib/fetchJikan"
import moment from "moment"
import Link from "next/link"

export interface MixedDataFeed {
  entries: MixedData[]
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

//Fetch to MongoDB and grab a list of all the user's anime entries
async function fetchFeed(): Promise<MixedDataFeed> {
  const url = `http://nunko-amber.vercel.app/api/user/feed`
  const res = await fetch(url, { cache: "no-store" })
  handleResponseError(res)
  return res.json()
}

export default async function FeedPage() {
  const { entries } = await fetchFeed()
  const sortedData = sortByUpdatedDate(entries)

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
      if (data.status === "Watching" && data.progress === "0") return `Started watching`
      if (data.status === "Watching" && data.progress !== "0")
        return `Watched episode ${data.progress} of`
      if (data.status === "Paused") return `Paused on episode ${data.progress} of`
    }

    if (checkTypeOfManga(data.type)) {
      if (data.status === "Completed") return "Finished reading"
      if (data.status === "Planned") return "Plans to read"
      if (data.status === "Dropped") return "Dropped the series"
      if (data.status === "Reading" && data.progress === "0") return `Started reading`
      if (data.status === "Reading" && data.progress !== "0")
        return `Read chapter ${data.progress} of`
      if (data.status === "Paused") return `Paused on chapter ${data.progress} of`
    }
    return null
  }
  return (
    <main className="container mx-auto flex-1 px-4 py-20 sm:px-8 md:px-12 lg:px-40">
      <section>
        <h2 className="mb-4 text-[15px] font-medium">Global Feed</h2>
        {sortedData.length > 0 ? (
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {sortedData.map((item) => {
              const date = moment(item.updatedAt).fromNow()

              return (
                <div key={item.mal_id} className="flex items-center gap-4 rounded border px-4 py-8">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={item.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="text-sm text-muted-foreground">
                    <div>
                      <Link
                        href={`/user/${item.username}`}
                        className="font-medium text-foreground transition-colors hover:text-blue-500"
                      >
                        {item.username}
                      </Link>{" "}
                      <span className="lowercase">{handleAnimeActions(item)}</span>{" "}
                      <Link
                        href={`/${checkTypeOfAnime(item.type) ? "anime" : "manga"}/${item.mal_id}`}
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
      <Footer />
    </main>
  )
}
