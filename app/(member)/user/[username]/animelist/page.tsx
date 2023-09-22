import { handleResponseError } from "@/lib/fetchJikan"
import { Dummy } from "@/components/dummy"
import { Anime, IAnimes } from "@/app/anime/[id]/layout"
import { columns } from "@/components/datatable/columns"
import { DataTable } from "@/components/datatable/data-table"
import { AnimeListFilterSelect } from "@/components/datatable/query-select"

//Fetch to MongoDB and grab a list of all the user's anime entries
async function fetchUserAnimes(username: string | undefined): Promise<IAnimes> {
  //   const url = `http://nunko-amber.vercel.app/api/user/animelist/${username}`
  const url = `http://localhost:3000/api/user/animelist/${username}`
  //   const res = await fetch(url, { cache: "no-store" })
  const res = await fetch(url, { next: { revalidate: 60 } })
  handleResponseError(res)
  return res.json()
}

//Filters and sorts user data depending on current search parameters
function transformData(
  data: Anime[],
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
      (item) => item.airingStatus.toLowerCase() === filterStatus?.toLowerCase()
    )
  }

  const sorted = filteredData.sort((a, b) => {
    return Number(b.score) - Number(a.score) || a.title.localeCompare(b.title)
  })

  return sorted
}

// Filters the data once more depending on the status of the anime
function filterData(data: Anime[], status: string) {
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
  const { animes } = await fetchUserAnimes(username)
  const allAnimes = transformData(animes, format, status)

  const sections = [
    { title: "Currently Watching", data: filterData(allAnimes, "Watching") },
    { title: "Plan to watch", data: filterData(allAnimes, "Planned") },
    { title: "Completed", data: filterData(allAnimes, "Completed") },
    { title: "Dropped", data: filterData(allAnimes, "Dropped") },
    { title: "Paused", data: filterData(allAnimes, "Paused") },
    { title: "Hiatus", data: filterData(allAnimes, "Hiatus") },
  ]

  return (
    <>
      <Dummy data={animes} />
      <div className="flex flex-wrap justify-end gap-2">
        <AnimeListFilterSelect
          placeholder="List"
          data={["Currently Watching", "Plan to watch", "Completed"]}
        />
        <AnimeListFilterSelect placeholder="Format" data={["TV", "Movie", "OVA", "ONA", "Music"]} />
        <AnimeListFilterSelect
          placeholder="Status"
          data={["Currently Airing", "Finished Airing", "Hiatus"]}
        />
      </div>

      {sections.map((section) => {
        const hasData = section.data.length > 0
        const listQueryMatches = list?.toLowerCase() === section.title?.toLowerCase()
        if (hasData && (listQueryMatches || !list))
          return (
            <section className="py-8" key={section.title}>
              <DataTable columns={columns} data={section.data} title={section.title} />
            </section>
          )
        return null
      })}
    </>
  )
}
