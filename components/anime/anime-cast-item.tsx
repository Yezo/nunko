"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IIndividualAnimeCharactersData } from "@/types/typeIndividualAnimeChars"
import Jikan from "jikan4.js"

type Props = {
  data: IIndividualAnimeCharactersData
  language: string
}

export const AnimeCastItem = ({ data, language }: Props) => {
  const currentSetOfVoiceActors = data.voice_actors.filter((item) => item.language === language)
  const img = currentSetOfVoiceActors.map((item) => item.person.images?.jpg?.image_url)
  const actor_name = currentSetOfVoiceActors.map((item) => item.person.name)

  return (
    <div className="flex min-h-[85px] justify-between gap-2 rounded border text-xs shadow-sm">
      <div className="flex">
        <Avatar className="h-[85px] w-16 rounded-none rounded-l">
          {data &&
            data.character &&
            data.character.images.webp &&
            data.character.images.webp.image_url && (
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
      <div className="flex flex-row-reverse">
        <Avatar className="h-[85px] w-16 rounded-none rounded-r">
          <AvatarImage
            src={img[0]?.toString()}
            className="object-cover object-top ring-1 ring-black/10"
          />
          <NoImageFallback />
        </Avatar>

        <div className="flex flex-col items-end justify-between p-2 text-xs ">
          <span className="max-w-[15ch] text-right font-semibold">
            {actor_name && actor_name.length > 0 ? actor_name[0] : null}
          </span>
          <span className=" text-right text-[0.7rem] font-light tracking-tight text-muted-foreground">
            {actor_name && actor_name.length > 0 ? language : null}
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
