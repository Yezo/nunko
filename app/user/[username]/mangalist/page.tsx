import { handleResponseError } from "@/lib/fetchJikan"
import { DataTable } from "@/components/datatable/data-table"
import { AnimeListFilterSelect } from "@/components/datatable/query-select"
import { IMangas, Manga } from "@/app/manga/[id]/layout"
import { mangaColumns } from "@/components/datatable/manga/manga-columns"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { guestMangaColumns } from "@/components/datatable/manga/guest-manga-columns"

//Fetch to MongoDB and grab a list of all the user's anime entries
async function fetchUserMangas(username: string | undefined): Promise<IMangas> {
  const url = `http://nunko-amber.vercel.app/api/user/mangalist/${username}`
  const res = await fetch(url, { cache: "no-store" })
  handleResponseError(res)
  return res.json()
}

//Filters and sorts user data depending on current search parameters
function transformData(
  data: Manga[],
  filterFormat: string | undefined,
  filterStatus: string | undefined
) {
  let filteredData = [...data]

  if (filterFormat) {
    filteredData = filteredData.filter(
      (item) => item.type.toLowerCase() === filterFormat?.toLowerCase()
    )
  }

  if (filterStatus) {
    filteredData = filteredData.filter(
      (item) => item.publishingStatus.toLowerCase() === filterStatus?.toLowerCase()
    )
  }

  const sorted = filteredData.sort((a, b) => {
    return Number(b.score) - Number(a.score) || a.title.localeCompare(b.title)
  })

  return sorted
}

// Filters the data once more depending on the status of the anime
function filterData(data: Manga[], status: string) {
  const filtered = data.filter((item) => item.status === status)
  return filtered
}

type UsernameAnimeListPageProps = {
  params: { username: string }
  searchParams: { format: string | undefined; status: string | undefined; list: string | undefined }
}

export default async function UsernameAnimeListPage({
  params,
  searchParams,
}: UsernameAnimeListPageProps) {
  const { format, status, list } = searchParams
  const { username } = params
  const { mangas } = await fetchUserMangas(username)
  const session = await getServerSession(authOptions)
  const allMangas = transformData(mangas, format, status)
  const ids = [...new Set(mangas.map((item) => item.user_id))]

  const sections = [
    { title: "Currently Reading", data: filterData(allMangas, "Reading") },
    { title: "Plan to read", data: filterData(allMangas, "Planned") },
    { title: "Completed", data: filterData(allMangas, "Completed") },
    { title: "Dropped", data: filterData(allMangas, "Dropped") },
    { title: "Paused", data: filterData(allMangas, "Paused") },
    { title: "Hiatus", data: filterData(allMangas, "Hiatus") },
  ]

  return (
    <>
      <div className="flex flex-wrap justify-end gap-2">
        <AnimeListFilterSelect
          placeholder="List"
          data={["Currently Reading", "Plan to read", "Completed"]}
        />
        <AnimeListFilterSelect
          placeholder="Format"
          data={["Manga", "Novel", "Light Novel", "One-shot", "Doujin", "Manhwa", "Manhua"]}
        />
        <AnimeListFilterSelect placeholder="Status" data={["Publishing", "Finished", "Hiatus"]} />
      </div>

      {sections.map((section) => {
        const hasData = section.data.length > 0
        const listQueryMatches = list?.toLowerCase() === section.title?.toLowerCase()
        if (hasData && (listQueryMatches || !list))
          return (
            <section className="py-8" key={section.title}>
              <DataTable
                columns={ids && ids[0] === session?.user?.id ? mangaColumns : guestMangaColumns}
                data={section.data}
                title={section.title}
              />
            </section>
          )
        return null
      })}

      {/* Check if no sections were rendered and display the desired section */}
      {sections.every((section) => {
        const hasData = section.data.length > 0
        const listQueryMatches = list?.toLowerCase() === section.title?.toLowerCase()
        return !(hasData && (listQueryMatches || !list))
      }) && (
        <section className="mt-8 grid min-h-[625px] place-items-center rounded border">
          <div className="flex flex-col items-center justify-center gap-4">
            <BirdSVG />
            <div className="text-center">
              <div className="text-lg font-medium tracking-tight text-foreground">No results!</div>
              <div className="text-center text-sm text-muted-foreground">
                There may be too many filters applied.
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

const BirdSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 7h.01" />
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
      <path d="m20 7 2 .5-2 .5" />
      <path d="M10 18v3" />
      <path d="M14 17.75V21" />
      <path d="M7 18a6 6 0 0 0 3.84-10.61" />
    </svg>
  )
}
