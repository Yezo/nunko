"use client"

import { Anime, IAnimes } from "@/app/anime/[id]/layout"
import { AnimeListFeatureButton } from "@/components/anime/single/features/feature-button"
import { ReadingBookSVG, EyeSVG, BookmarkSVG, CheckmarkSVG, EditPencilSVG } from "@/lib/icons"
import { IAnimeData } from "@/types/anime/type-anime"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type FeatureContainerProps = {
  data: IAnimeData
  user: IAnimes
  editAnimeStatus: (status: string, animeID: string) => Promise<void>
}
export const FeatureContainer = ({ data, user, editAnimeStatus }: FeatureContainerProps) => {
  const filtered: Anime[] = user.animes.filter((item) => item.title === data.title)
  const thisEntryExistsInDB = filtered.length > 0
  const filteredStatus = filtered.map((item) => item.status)
  const [added, setAdded] = useState(thisEntryExistsInDB)
  const [status, setStatus] = useState(filteredStatus[0] || "NONE")
  console.log(user)

  return (
    <div className="flex flex-wrap gap-4">
      <AnimeListFeatureButton
        title={`${added ? "Edit entry" : "Add entry"}`}
        data={data}
        added={added}
        setAdded={setAdded}
        setStatus={setStatus}
        filtered={filtered}
      >
        {added ? <Pencil2Icon className="h-[24px] w-[24px]" /> : <ReadingBookSVG />}
      </AnimeListFeatureButton>

      {added && (
        <>
          <Item
            title="Watching"
            status={status}
            editAnimeStatus={editAnimeStatus}
            data={data}
            setStatus={setStatus}
          >
            <EyeSVG />
          </Item>
          <Item
            title="Planned"
            status={status}
            editAnimeStatus={editAnimeStatus}
            data={data}
            setStatus={setStatus}
          >
            <BookmarkSVG />
          </Item>
          <Item
            title="Completed"
            status={status}
            editAnimeStatus={editAnimeStatus}
            data={data}
            setStatus={setStatus}
          >
            <CheckmarkSVG />
          </Item>
        </>
      )}
    </div>
  )
}

type ItemProps = {
  children: React.ReactNode
  title: string
  status: string
  data: IAnimeData
  setStatus: Dispatch<SetStateAction<string>>
  editAnimeStatus: (status: string, animeID: string) => Promise<void>
}
const Item = ({ title, children, status, editAnimeStatus, data, setStatus }: ItemProps) => {
  const match = status === title

  const handleClick = async (status: string) => {
    await editAnimeStatus(status, data.mal_id.toString())
    setStatus(status)
  }
  return (
    <div className="space-y-2" onClick={() => handleClick(title)}>
      <button
        className={`mx-auto rounded-lg border px-6 py-2 shadow-sm transition-colors duration-300 hover:bg-accent md:px-8 md:py-3.5 ${
          match && title === "Completed" && "bg-green-600"
        } ${match && title === "Planned" && "bg-orange-600"} ${
          match && title === "Watching" && "bg-blue-600"
        }`}
      >
        {children}
      </button>
      <p className="text-center text-xs text-muted-foreground">{title}</p>
    </div>
  )
}
