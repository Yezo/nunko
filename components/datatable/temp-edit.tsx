"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Anime } from "@/app/anime/[id]/layout"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EditTableForm } from "@/components/datatable/edit-entry"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import Image from "next/image"
import Link from "next/link"

type EditEntryProps = {
  data?: Anime | undefined
}
export const EditEntry = ({ data }: EditEntryProps) => {
  const [open, setOpen] = useState(false)

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <div className="group flex min-w-[580px] items-center gap-4 px-4 font-medium text-muted-foreground transition-colors hover:text-foreground">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div>
                <Avatar className="h-10 w-10 rounded group-hover:hidden">
                  {data?.image && <AvatarImage src={data?.image} className="object-cover" />}
                  <NoImageFallback />
                </Avatar>
                <div className="hidden h-10 w-10 rounded bg-accent group-hover:grid  group-hover:cursor-pointer group-hover:place-items-center">
                  <DotsHorizontalIcon />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="flex min-w-[650px] gap-4">
              <DialogHeader className="relative min-h-full min-w-[210px]">
                <Image
                  src={data?.image as string}
                  alt={data?.mal_id.toString() as string}
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
                    <Badge>{data?.type}</Badge> <Badge>{data?.airingStatus}</Badge>
                  </div>
                </div>

                <EditTableForm setOpen={setOpen} data={data} />
              </div>
            </DialogContent>
          </Dialog>

          <Link href={`/anime/${data?.mal_id}`}> {data?.title}</Link>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side={"left"}
        sideOffset={25}
        align="center"
        alignOffset={0}
        className="max-w-[165px] shadow-sm "
      >
        <div className="relative min-h-[225px] min-w-full">
          <Image
            src={data?.image as string}
            alt={data?.mal_id.toString() as string}
            fill
            className="h-full w-full rounded border object-cover object-top shadow-md"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

const NoImageFallback = () => {
  return (
    <AvatarFallback className="rounded">
      <Skeleton className="h-10 w-10 rounded" />
    </AvatarFallback>
  )
}
