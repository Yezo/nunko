import { AnimeFilterDropdown } from "@/components/anime/anime-dropdown"
import { Input } from "@/components/ui/input"

type Props = {}
export const AnimeSearchHeader = ({}: Props) => {
  const years = [
    "1999-01-01",
    "2000-01-01",
    "2001-01-01",
    "2002-01-01",
    "2003-01-01",
    "2004-01-01",
    "2005-01-01",
    "2006-01-01",
    "2007-01-01",
    "2008-01-01",
    "2009-01-01",
    "2010-01-01",
    "2011-01-01",
    "2023-01-01",
  ]
  return (
    <div className="space-y-4 px-4">
      <h1 className="font-domine text-2xl font-semibold tracking-tight">Top Anime</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Search</p>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Order</p>
          <AnimeFilterDropdown
            title="All"
            type="Order_by"
            data={["Favorites", "Score", "Rank", "Start_date", "Popularity"]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Page</p>
          <AnimeFilterDropdown title="All" type="Page" data={["1", "2", "3", "4", "5"]} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Year</p>
          <AnimeFilterDropdown title="All" type="start_date" data={years} scrollable={true} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Type</p>
          <AnimeFilterDropdown
            title="All"
            type="Type"
            data={["TV", "Movie", "Special", "OVA", "ONA", "Music"]}
          />
        </div>
      </div>
    </div>
  )
}
