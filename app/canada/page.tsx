import { AnimeLinksHeader } from "@/components/anime/single/anime-links-header"
import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import React from "react"

type Props = {}

export default function CanadaPage({}: Props) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="container mx-auto flex-1 px-4">
        <div className="flex flex-col-reverse justify-between border-b py-12 md:flex-row lg:py-20">
          <div className="flex flex-col justify-center gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground"></div>
            </div>
          </div>
        </div>

        <section className="flex flex-col gap-28 py-8 lg:flex-row">
          <div className="space-y-8 lg:basis-2/4 xl:basis-3/4">
            <AnimeLinksHeader id={"1"} />
          </div>
        </section>
      </main>
    </div>
  )
}
