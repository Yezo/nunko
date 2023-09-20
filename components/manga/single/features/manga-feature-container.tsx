"use client"

import { IMangas, Manga } from "@/app/manga/[id]/layout"
import { MangaListFeatureButton } from "@/components/manga/single/features/manga-feature-button"
import { ReadingBookSVG, EyeSVG, BookmarkSVG, CheckmarkSVG } from "@/lib/icons"
import { IMangaData } from "@/types/manga/type-manga"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { Dispatch, SetStateAction, useState } from "react"

type FeatureContainerProps = {
  data: IMangaData //Anime data of an entry = 'One Piece', 'Naruto', 'Bleach'
  user: IMangas //A list of the user's anime entries
  editMangaStatus: (status: string, mangaID: string) => Promise<void> //Server action for edits
}
export const MangaFeatureContainer = ({ data, user, editMangaStatus }: FeatureContainerProps) => {
  const filtered: Manga | undefined = user.mangas.find((item) => item.title === data.title)
  const thisEntryExistsInDB = filtered !== undefined
  const [added, setAdded] = useState(thisEntryExistsInDB)
  const [status, setStatus] = useState(filtered?.status || "NONE")

  return (
    <div className="flex flex-wrap gap-4">
      <MangaListFeatureButton
        title={`${added ? "Edit entry" : "Add entry"}`}
        data={data}
        added={added}
        setAdded={setAdded}
        status={status}
        setStatus={setStatus}
        filtered={filtered}
      >
        {added ? <Pencil2Icon className="h-[24px] w-[24px]" /> : <ReadingBookSVG />}
      </MangaListFeatureButton>

      {added && (
        <>
          <Item
            title="Reading"
            status={status}
            editMangaStatus={editMangaStatus}
            data={data}
            setStatus={setStatus}
          >
            <EyeSVG />
          </Item>
          <Item
            title="Planned"
            status={status}
            editMangaStatus={editMangaStatus}
            data={data}
            setStatus={setStatus}
          >
            <BookmarkSVG />
          </Item>
          <Item
            title="Completed"
            status={status}
            editMangaStatus={editMangaStatus}
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
  data: IMangaData
  setStatus: Dispatch<SetStateAction<string>>
  editMangaStatus: (status: string, mangaID: string) => Promise<void>
}
const Item = ({ title, children, status, editMangaStatus, data, setStatus }: ItemProps) => {
  const match = status === title

  const handleClick = async (status: string) => {
    if (!match) {
      await editMangaStatus(status, data.mal_id.toString())
      setStatus(status)
    }
  }
  return (
    <div className="space-y-2" onClick={() => handleClick(title)}>
      <button
        className={`mx-auto rounded-lg border px-6 py-2 shadow-sm transition-colors duration-300  md:px-8 md:py-3.5 
        ${match && title === "Completed" && "bg-green-400 dark:bg-green-600"} 
        ${match && title === "Planned" && "bg-orange-400 dark:bg-orange-600"} 
        ${match && title === "Reading" && "bg-blue-400 dark:bg-blue-600"} 
        ${
          title === "Completed" &&
          " hover:bg-green-600 hover:text-background dark:hover:bg-green-400"
        }
        ${
          title === "Planned" &&
          "hover:bg-orange-600 hover:text-background dark:hover:bg-orange-400"
        }
        ${title === "Reading" && "hover:bg-blue-600 hover:text-background dark:hover:bg-blue-400"}
      `}
      >
        {children}
      </button>
      <p className="text-center text-xs text-muted-foreground">{title}</p>
    </div>
  )
}
