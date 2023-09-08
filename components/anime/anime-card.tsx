"use client"

import { ITopAnimeData } from "@/types/anime/type-top-anime"
import Image from "next/image"
import Link from "next/link"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type AnimeCardProps = {
  data: ITopAnimeData
}

export const AnimeCard = ({ data }: AnimeCardProps) => {
  return (
    <HoverCard openDelay={500}>
      <HoverCardTrigger asChild>
        <Link href={`/anime/${data.mal_id}`}>
          <div className="space-y-2 py-8">
            <div className="relative h-[295px] w-[215px]">
              <Image
                src={data.images.webp.large_image_url}
                alt={data.mal_id.toString()}
                fill
                className="h-full w-full rounded border object-cover object-top shadow-xl"
                quality={100}
              />
            </div>

            <p className="max-w-[20ch] text-[0.8rem] font-medium leading-5 tracking-tight text-muted-foreground transition-colors duration-200 hover:text-foreground">
              {data.title}
            </p>
          </div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        side={"right"}
        sideOffset={0}
        align="start"
        alignOffset={30}
        className="w-[350px] border-2 shadow-sm"
      >
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">{data.title}</h3>
            <div className="text-xs font-medium text-muted-foreground">
              {data.type} • {data.status}
            </div>
          </div>

          <div className="grid place-items-center rounded-md border p-2 text-sm font-semibold">
            {data.rank && "#" + data.rank.toLocaleString("en-US")}
          </div>
        </div>

        <Separator className="my-3" />

        {data.synopsis && (
          <ScrollArea className="h-[200px] w-full pr-4 text-sm text-muted-foreground">
            {data.synopsis}
          </ScrollArea>
        )}

        <Separator className="my-3" />

        <div className="flex flex-wrap gap-1">
          {data.genres.map((item, index) => (
            <Badge variant="outline" key={index}>
              {item.name}
            </Badge>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
