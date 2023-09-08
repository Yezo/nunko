"use client"

import { AnimeCastItem } from "@/components/anime/anime-cast-item"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { IAnimeCharacter } from "@/types/anime/type-anime-characters"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AnimeCastProps = {
  data: IAnimeCharacter[]
  disableVoiceActors?: boolean
}

export const AnimeCast = ({ data, disableVoiceActors }: AnimeCastProps) => {
  const [language, setLanguage] = useState("English")
  const uniqueLanguages = [
    ...new Set(data?.map((item) => item.voice_actors.map((item) => item.language))),
  ].flat()
  const set = [...new Set(uniqueLanguages)]
  const a = set.filter((item) => item !== "English" && item !== "Japanese")
  const languages = ["English", "Japanese", ...a]

  return (
    <div>
      <div className="mb-8 flex justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex min-w-[175px] items-center justify-between gap-4"
            >
              <span>{language}</span> <CaretSortIcon className="" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[175px] ">
            {languages.map((item, index) => (
              <DropdownMenuItem key={index} onClick={() => setLanguage(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2">
        {data?.map((item, index) => (
          <AnimeCastItem
            key={index}
            data={item}
            language={language}
            disableVoiceActors={disableVoiceActors}
          />
        ))}
      </div>
    </div>
  )
}
