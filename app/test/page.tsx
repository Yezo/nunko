import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import Link from "next/link"
import React from "react"

type Props = {}

export default function page({}: Props) {
  return (
    <div className="grid grid-cols-7">
      <aside className="sticky top-0 col-span-1 grid min-h-screen place-items-center self-start border-r">
        <div className="flex flex-col gap-4">
          <Link href="/anime/1">Cowboy Bebop</Link>
          <Link href="/anime/21">One Piece</Link>
          <Link href="/anime/54538">Zombies</Link>

          <Link href="/search/anime/top-100">Top 100</Link>
        </div>
      </aside>

      <main className="col-span-6">
        <div className="min-h-screen">d</div>
        <div className="min-h-screen">d</div>
      </main>
    </div>
  )
}
