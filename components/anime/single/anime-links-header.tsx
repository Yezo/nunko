"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type AnimeLinksHeaderProps = {
  id: string
}

export const AnimeLinksHeader = ({ id }: AnimeLinksHeaderProps) => {
  const path = usePathname()

  return (
    <div className="mb-8 grid auto-cols-min grid-cols-2 gap-2 rounded-md border p-1 text-center text-[0.8rem] font-medium text-muted-foreground sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-7">
      <Item title="Overview" url={`/anime/${id}`} path={path}></Item>
      <Item title="Characters" url={`/anime/${id}/characters`} path={path}></Item>
      <Item title="Staff" url={`/anime/${id}/staff`} path={path}></Item>
      <Item title="News" url={`/anime/${id}/news`} path={path}></Item>
      <Item title="Episodes" url={`/anime/${id}/episodes`} path={path}></Item>
      <Item title="Recommendations" url={`/anime/${id}/recommendations`} path={path}></Item>

      <Item title="Reviews" url={`/anime/${id}/reviews`} path={path}></Item>
    </div>
  )
}

const Item = ({ url, title, path }: { url: string; title: string; path: string }) => {
  return (
    <Link href={url}>
      <h2
        className={
          path === url
            ? "rounded bg-muted/90 px-2 py-2 text-foreground"
            : "rounded bg-background/50 px-2 py-2 text-foreground/50 transition-colors hover:bg-muted/90 hover:text-foreground"
        }
      >
        {title}
      </h2>
    </Link>
  )
}
