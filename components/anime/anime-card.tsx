"use client"

import { ITopAnimeData } from "@/types/typeTopAnime"
import Image from "next/image"

type Props = {
  data: ITopAnimeData
}

export const AnimeCard = ({ data }: Props) => {
  return (
    <div className="grid place-items-center gap-4 py-8">
      <div className="relative h-[250px] w-[250px]">
        <Image
          src={data.images.webp.large_image_url}
          alt={data.mal_id.toString()}
          fill
          className="h-full w-full object-cover object-top shadow-xl ring-1 ring-[#131314]/80 dark:ring-foreground/80"
        ></Image>
      </div>
      <div className="">
        <p className="max-w-[25ch] truncate text-center text-xs font-semibold leading-5 tracking-tight ">
          {data.title}
        </p>
        <div className="max-w-[25ch] truncate text-center text-xs font-semibold leading-5 tracking-tight text-muted-foreground ">
          <div>{`Score: ${data.score}`}</div>
          <div>{`Favorites: ${data.favorites}`}</div>
          <div>{`Rank: ${data.rank}`}</div>
          <div>{`Popularity: ${data.popularity}`}</div>
        </div>
      </div>
    </div>
  )
}
