import { AnimeFilterDropdown } from "@/components/anime/top/anime-dropdown"
import { AnimeFilterInput } from "@/components/anime/top/anime-input"
import {
  ANIME_MAIN_GENRES_ARR_DATA,
  ORDERS_DATA,
  TYPES_DATA,
  YEARS_DATA,
} from "@/components/anime/top/anime-data"

export const AnimeSearchHeader = () => {
  return (
    <div className="space-y-4 py-20">
      <h1 className="font-domine text-2xl font-semibold tracking-tight">Top Anime</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <FilterItem title="Search">
          <AnimeFilterInput />
        </FilterItem>

        <FilterItem title="Sort">
          <AnimeFilterDropdown type="Order_by" data={ORDERS_DATA} />
        </FilterItem>

        <FilterItem title="Release Date">
          <AnimeFilterDropdown type="start_date" data={YEARS_DATA} scrollable={true} />
        </FilterItem>

        <FilterItem title="Format">
          <AnimeFilterDropdown type="Type" data={TYPES_DATA} />
        </FilterItem>

        <FilterItem title="Genres">
          <AnimeFilterDropdown type="Genres" data={ANIME_MAIN_GENRES_ARR_DATA} scrollable={true} />
        </FilterItem>
      </div>
    </div>
  )
}

const FilterItem = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{title}</p>
      {children}
    </div>
  )
}
