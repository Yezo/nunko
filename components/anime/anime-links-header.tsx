"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type AnimeLinksHeaderProps = {
  id: string
}
export const AnimeLinksHeader = ({ id }: AnimeLinksHeaderProps) => {
  const path = usePathname()

  return (
    <div className="mb-8 flex gap-2">
      <Link href={`/anime/${id}`}>
        <h2 className={path === `/anime/${id}` ? "text-red-500" : ""}>Description</h2>
      </Link>
      <Link href={`/anime/${id}/characters`}>
        <h2 className={path === `/anime/${id}/characters` ? "text-red-500" : ""}>Characters</h2>
      </Link>
      <Link href={`/anime/${id}/reviews`}>
        <h2 className={path === `/anime/${id}/reviews` ? "text-red-500" : ""}>Reviews</h2>
      </Link>
      <Link href={`/anime/${id}/episodes`}>
        <h2 className={path === `/anime/${id}/episodes` ? "text-red-500" : ""}>Episodes</h2>
      </Link>
      <Link href={`/anime/${id}/recommendations`}>
        <h2 className={path === `/anime/${id}/recommendations` ? "text-red-500" : ""}>
          Recommendations
        </h2>
      </Link>
    </div>
  )
}
