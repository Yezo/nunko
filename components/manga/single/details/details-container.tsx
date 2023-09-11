"use client"

import { DetailsHeader } from "@/components/anime/single/details/details-header"
import { DetailItem } from "@/components/anime/single/details/details-item"
import { Separator } from "@/components/ui/separator"
import { IMangaData } from "@/types/manga/type-manga"
import moment from "moment"

type MangaDetailsContainerProps = {
  data: IMangaData
}

export const MangaDetailsContainer = ({ data }: MangaDetailsContainerProps) => {
  const startDate = moment(data.published.from).utc().format("MMMM D[,] YYYY")
  const endDate = moment(data.published.to).utc().format("MMMM D[,] YYYY")

  return (
    <section className="space-y-12 lg:basis-2/4 xl:basis-1/4">
      <div>
        <DetailsHeader title="Details" />
        <div className="space-y-4 rounded-lg border py-6 text-sm">
          <DetailItem data={data.score} title="Score" />
          <DetailItem data={data.rank} title="Rank" />
          <DetailItem data={data.popularity} title="Popularity" />
          <DetailItem data={data.favorites} title="Favorites" />

          <Separator />

          <DetailItem data={data.title} title="Romaji" />
          <DetailItem data={data.title_english} title="English" />
          <DetailItem data={data.title_japanese} title="Japanese" />
          <DetailItem data={data.genres} title="Genres" />
        </div>
      </div>

      <div>
        <DetailsHeader title="Information" />
        <div className="space-y-4 rounded-lg border py-6 text-sm">
          <DetailItem data={data.type} title="Format" />
          <DetailItem data={data.status} title="Status" />
          <DetailItem data={data.chapters} title="Chapters" />
          <DetailItem data={startDate} title="Start Date" />
          <DetailItem data={endDate} title="End Date" />

          <Separator />

          <DetailItem data={data.authors} title="Author(s)" />
          <DetailItem data={data.serializations} title="Serialization" />
        </div>
      </div>
    </section>
  )
}
