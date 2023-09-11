"use client"

import { DetailsHeader } from "@/components/anime/single/details/details-header"
import { IAnimeData } from "@/types/anime/type-anime"
import { DetailItem } from "@/components/anime/single/details/details-item"
import { Separator } from "@/components/ui/separator"
import { formatDateToMMDDYYYY } from "@/lib/utils"

type AnimeDetailsContainerProps = {
  data: IAnimeData
}

export const AnimeDetailsContainer = ({ data }: AnimeDetailsContainerProps) => {
  const startDate = formatDateToMMDDYYYY(data.aired.from)
  const endDate = formatDateToMMDDYYYY(data.aired.to)

  return (
    <section className="space-y-12 lg:basis-2/4 xl:basis-1/4">
      <section>
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
      </section>

      <section>
        <DetailsHeader title="Broadcast" />
        <div className="space-y-4 rounded-lg border py-6 text-sm">
          <DetailItem data={data.type} title="Format" />
          <DetailItem data={data.status} title="Status" />
          <DetailItem data={data.episodes} title="Episodes" />
          <DetailItem data={data.duration} title="Duration" />
          <DetailItem data={data.rating} title="Rating" />
          <DetailItem data={data.season} title="Season" />
          <DetailItem data={startDate} title="Start Date" />
          <DetailItem data={endDate} title="End Date" />

          <Separator />

          <DetailItem data={data.studios} title="Studios" />
          <DetailItem data={data.producers} title="Producers" />
          <DetailItem data={data.licensors} title="Licensors" />
        </div>
      </section>
    </section>
  )
}
