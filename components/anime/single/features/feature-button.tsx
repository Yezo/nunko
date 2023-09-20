"use client"

import { CreateAnimeEntryForm } from "@/components/forms/create-anime-entry"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IAnimeData } from "@/types/anime/type-anime"
import { Dispatch, SetStateAction, useState } from "react"

type AnimeListFeatureButtonProps = {
  children: React.ReactNode
  title: string
  data: IAnimeData
  added: boolean
  setAdded: Dispatch<SetStateAction<boolean>>
  setStatus: Dispatch<SetStateAction<string>>
}
export const AnimeListFeatureButton = ({
  children,
  title,
  data,
  added,
  setAdded,
  setStatus,
}: AnimeListFeatureButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="space-y-2">
          <button
            className={`mx-auto rounded-lg border px-6 py-2 shadow-sm transition-colors duration-300 hover:bg-accent md:px-8 md:py-3.5 ${
              added && "bg-muted/80"
            }`}
          >
            {children}
          </button>
          <p className="text-center text-xs text-muted-foreground">{title}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CreateAnimeEntryForm
          data={data}
          setOpen={setOpen}
          setAdded={setAdded}
          setStatus={setStatus}
        />
      </DialogContent>
    </Dialog>
  )
}
