"use client"

import { IMangaCharacter } from "@/types/manga/type-manga-characters"
import { MangaCastItem } from "@/components/manga/single/characters/manga-cast-item"

type MangaCastProps = {
  data: IMangaCharacter[]
}

export const MangaCast = ({ data }: MangaCastProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2">
        {data?.map((item, index) => (
          <MangaCastItem key={index} data={item} />
        ))}
      </div>
    </div>
  )
}
