"use client"

import { Manga } from "@/app/manga/[id]/layout"
import { EditMangaTable } from "@/components/datatable/manga/edit-manga"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"

export const mangaColumns: ColumnDef<Manga>[] = [
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
      const {
        image,
        title,
        _id,
        mal_id,
        status,
        createdAt,
        progress,
        score,
        type,
        updatedAt,
        user_id,
        username,
        volumes,
        publishingStatus,
        chapters,
        __v,
      } = row.original
      const data: Manga = {
        image: image,
        title: title,
        _id: _id,
        mal_id: mal_id,
        chapters: chapters,
        volumes: volumes,
        status: status,
        publishingStatus: publishingStatus,
        createdAt: createdAt,
        progress: progress,
        username: username,
        user_id: user_id,
        updatedAt: updatedAt,
        type: type,
        score: score,
        __v: __v,
      }
      return <EditMangaTable data={data} />
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
      const { progress, chapters } = row.original

      return (
        <div className="min-w-full px-4 text-center font-medium capitalize text-muted-foreground">
          {progress}/{chapters === 0 ? "?" : chapters}
        </div>
      )
    },
  },
  {
    accessorKey: "publishingStatus",
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
      const { publishingStatus } = row.original

      const renameStatus = (status: string) => {
        if (status === "Finished Airing") return "Completed"
        if (status === "Currently Airing") return "Airing"
        return status
      }

      return (
        <div className="min-w-full px-4 text-center font-medium capitalize text-muted-foreground">
          {renameStatus(publishingStatus)}
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
