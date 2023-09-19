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
import { useState } from "react"

type AnimeListFeatureButtonProps = {
  children: React.ReactNode
  title: string
  data: IAnimeData
}

export const AnimeListFeatureButton = ({ children, title, data }: AnimeListFeatureButtonProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="space-y-2">
          <button className="mx-auto rounded-lg border px-6 py-2 shadow-sm transition-colors duration-300 hover:bg-accent  md:px-8 md:py-3.5">
            {children}
          </button>
          <p className="text-center text-xs text-muted-foreground">{title}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add entry</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CreateAnimeEntryForm data={data} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
