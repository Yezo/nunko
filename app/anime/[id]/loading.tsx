import { UpdateIcon } from "@radix-ui/react-icons"
import React from "react"

type Props = {}

export default function Loading({}: Props) {
  return (
    <div className="flex h-[30rem] items-center justify-center">
      <UpdateIcon className="h-[25px] w-[25px] animate-spin text-muted-foreground" />
    </div>
  )
}
