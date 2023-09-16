import { YEARS_DATA } from "@/components/anime/top/anime-data"
import { MangaFilterDropdown } from "@/components/manga/top/manga-dropdown"
import { MangaFilterInput } from "@/components/manga/top/manga-input"
import {
  MANGA_MAIN_GENRES_ARR_DATA,
  MANGA_ORDERS_TYPE,
  MANGA_TYPES_DATA,
} from "@/components/manga/top/manga-data"

export const MangaSearchHeader = () => {
  return (
    <div className="space-y-4 px-4 py-20">
      <h1 className="font-domine text-2xl font-semibold tracking-tight">Top Manga</h1>

      {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> */}
      <div className="flex flex-wrap gap-4">
        <FilterItem title="Search">
          <MangaFilterInput />
        </FilterItem>

        <FilterItem title="Sort">
          <MangaFilterDropdown title="All" type="Order_by" data={MANGA_ORDERS_TYPE} />
        </FilterItem>

        <FilterItem title="Release Date">
          <MangaFilterDropdown title="All" type="start_date" data={YEARS_DATA} scrollable={true} />
        </FilterItem>

        <FilterItem title="Format">
          <MangaFilterDropdown title="All" type="Type" data={MANGA_TYPES_DATA} />
        </FilterItem>

        <FilterItem title="Genres">
          <MangaFilterDropdown
            title="All"
            type="Genres"
            data={MANGA_MAIN_GENRES_ARR_DATA}
            scrollable={true}
          />
        </FilterItem>
      </div>
    </div>
  )
}

const FilterItem = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="flex w-[200px] flex-col gap-2">
      <p className="text-sm font-medium">{title}</p>
      {children}
    </div>
  )
}
