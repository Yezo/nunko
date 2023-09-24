"use client"

import { Anime } from "@/app/anime/[id]/layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const guestAnimeColumns: ColumnDef<Anime>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-foreground hover:bg-transparent"
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { image, title, mal_id } = row.original

      return (
        <div className="group flex min-w-[580px] items-center gap-4 px-4 font-medium text-muted-foreground transition-colors hover:text-foreground">
          <Link href={`/anime/${mal_id}`}>
            <Avatar className="h-10 w-10 rounded">
              {image && <AvatarImage src={image} className="object-cover" />}
              <NoImageFallback />
            </Avatar>
          </Link>
          <Link href={`/anime/${mal_id}`}> {title}</Link>
        </div>
      )
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="min-w-full max-w-[100px] text-center text-foreground hover:bg-transparent "
        >
          Score
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const score = row.original.score
      return (
        <div className="min-w-full px-4 text-center font-medium capitalize text-muted-foreground">
          {score === "0" ? "" : score}
        </div>
      )
    },
  },
  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="min-w-full text-center text-foreground hover:bg-transparent "
        >
          Progress
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { progress, episodes } = row.original

      return (
        <div className="min-w-full px-4 text-center font-medium capitalize text-muted-foreground">
          {progress}/{episodes === 0 ? "?" : episodes}
        </div>
      )
    },
  },
  {
    accessorKey: "airingStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="min-w-full text-center text-foreground hover:bg-transparent "
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { airingStatus } = row.original

      const renameStatus = (status: string) => {
        if (status === "Finished Airing") return "Completed"
        if (status === "Currently Airing") return "Airing"
        return status
      }

      return (
        <div className="min-w-full px-4 text-center font-medium capitalize text-muted-foreground">
          {renameStatus(airingStatus)}
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="min-w-full text-center text-foreground hover:bg-transparent "
        >
          Type
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { type } = row.original

      return (
        <div className="min-w-full px-4 text-center font-medium capitalize text-muted-foreground">
          {type}
        </div>
      )
    },
  },
]

const NoImageFallback = () => {
  return (
    <AvatarFallback className="rounded">
      <Skeleton className="h-10 w-10 rounded" />
    </AvatarFallback>
  )
}
