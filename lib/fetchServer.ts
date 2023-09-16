"use server"

import { handleResponseError } from "@/lib/fetchJikan"
import { SearchParams, transformString } from "@/lib/utils"
import { ITopAnime } from "@/types/anime/type-top-anime"
import { ITopMangas } from "@/types/manga/type-manga-all"

export async function getAllAnime(
  param: SearchParams,
  page: number,
  query: string
): Promise<ITopAnime> {
  const url = transformString(param, "anime", page, query)
  const res = await fetch(url)
  handleResponseError(res)

  return res.json()
}

export async function getAllManga(
  param: SearchParams,
  page: number,
  query: string
): Promise<ITopMangas> {
  const url = transformString(param, "manga", page, query)
  const res = await fetch(url)
  handleResponseError(res)

  return res.json()
}
