"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type AnimeLinksHeaderProps = {
  id: string
  type: "anime" | "manga"
}

export const IndividualLinksHeader = ({ id, type }: AnimeLinksHeaderProps) => {
  const path = usePathname()

  return (
    <div
      className={`mb-8 grid auto-cols-min grid-cols-2 gap-2 rounded-md border p-1 text-center text-[0.8rem] font-medium text-muted-foreground sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-5 ${
        type === "anime" && "2xl:grid-cols-6"
      }`}
    >
      <Item title="Overview" url={`/${type}/${id}`} path={path}></Item>
      <Item title="Characters" url={`/${type}/${id}/characters`} path={path}></Item>
      {type === "anime" && <Item title="Staff" url={`/${type}/${id}/staff`} path={path}></Item>}
      <Item title="Recommendations" url={`/${type}/${id}/recommendations`} path={path}></Item>
      {type === "anime" && (
        <Item title="Episodes" url={`/${type}/${id}/episodes`} path={path}></Item>
      )}
      {type === "manga" && (
        <Item title="Pictures" url={`/${type}/${id}/pictures`} path={path}></Item>
      )}
      <Item title="Reviews" url={`/${type}/${id}/reviews`} path={path}></Item>
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
