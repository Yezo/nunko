"use client"

import { Anime } from "@/app/anime/[id]/layout"
import { CreateAnimeEntryForm } from "@/components/forms/anime-entry/create-anime-entry"
import { EditAnimeEntryForm } from "@/components/forms/anime-entry/edit-anime-entry"
import { IAnimeData } from "@/types/anime/type-anime"
import { Dispatch, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

type AnimeListFeatureButtonProps = {
  children: React.ReactNode
  title: string
  data: IAnimeData
  added: boolean
  setAdded: Dispatch<SetStateAction<boolean>>
  setStatus: Dispatch<SetStateAction<string>>
  filtered: Anime | undefined
  status: string
}
export const AnimeListFeatureButton = ({
  children,
  title,
  data,
  added,
  setAdded,
  setStatus,
  filtered,
  status,
}: AnimeListFeatureButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="space-y-2">
          <button className="mx-auto rounded-lg border px-6 py-2 shadow-sm transition-colors duration-300 hover:bg-accent md:px-8 md:py-3.5">
            {children}
          </button>
          <p className="text-center text-xs text-muted-foreground">{title}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="flex gap-4">
        <DialogHeader className="relative hidden min-h-full min-w-[210px] sm:block">
          <Image
            src={data.images.webp.image_url}
            alt={data.mal_id.toString()}
            fill
            className="h-full w-full rounded border object-cover object-top shadow-md"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </DialogHeader>

        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <div className="mt-8 font-domine text-2xl font-medium text-foreground md:mt-0">
              {data?.title}
            </div>
            <div className="space-x-2 text-xs text-muted-foreground">
              <Badge>{data?.type}</Badge> <Badge>{data?.status}</Badge>
            </div>
          </div>
          {added ? (
            <EditAnimeEntryForm
              data={data}
              setOpen={setOpen}
              setAdded={setAdded}
              setStatus={setStatus}
              filtered={filtered}
              status={status}
            />
          ) : (
            <CreateAnimeEntryForm
              data={data}
              setOpen={setOpen}
              setAdded={setAdded}
              setStatus={setStatus}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
