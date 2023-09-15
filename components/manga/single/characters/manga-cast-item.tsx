"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IMangaCharacter } from "@/types/manga/type-manga-characters"

type MangaCastItemProps = {
  data: IMangaCharacter
}

export const MangaCastItem = ({ data }: MangaCastItemProps) => {
  return (
    <div className="flex min-h-[85px] justify-between gap-2 rounded border text-xs shadow-sm">
      <div className="flex">
        <Avatar className="h-[85px] w-16 rounded-none rounded-l">
          {data.character.images.webp.image_url && (
            <AvatarImage
              src={data.character.images.webp.image_url.toString()}
              className="rounded-l object-cover object-top"
            />
          )}
          <NoImageFallback />
        </Avatar>
        <div className="flex flex-col justify-between p-2 text-xs ">
          <span className="max-w-[15ch] font-semibold">{data.character.name}</span>
          <span className="text-[0.7rem] font-light tracking-tight text-muted-foreground ">
            {data.role}
          </span>
        </div>
      </div>
    </div>
  )
}

const NoImageFallback = () => {
  return (
    <AvatarFallback className="rounded object-cover object-top px-2 text-center font-medium text-muted-foreground ring-1 ring-black/10">
      NO IMAGE
    </AvatarFallback>
  )
}
