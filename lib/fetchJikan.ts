import { transformString, wait } from "@/lib/utils"
import { IAnimeEpisodes } from "@/types/typeEpisodes"
import { IIndividualAnime } from "@/types/typeIndividualAnime"
import { IIndividualAnimeCharacters } from "@/types/typeIndividualAnimeChars"
import { IIndividualAnimeRecommendations } from "@/types/typeIndividualAnimeRecommendations"
import { ITopAnime } from "@/types/typeTopAnime"

export type paramProps = {
  id: string
}

export type getAllAnimeProp = {
  limit?: string
  page?: string
  sfw?: boolean
  rating?: string
  filter?: string
  type?: string
  order_by?: string
  sort?: string
  score?: string
  min_score?: string
  start_date?: string
  end_date?: string
  genres?: string
}

//The amount of milliseconds to throttle API calls to prevent rate-limiting
export const MS = 350

export const handleResponseError = (res: Response) => {
  if (res.status === 400) throw new Error("400: The developer has made an invalid request.")
  if (res.status === 404) throw new Error("404: The resource was not found or does not exist.")
  if (res.status === 429) throw new Error("429: You are currently being rate-limited. ")
  if (res.status === 500) throw new Error("500: Something went wrong. Please try again.")
  if (!res.ok) throw new Error("000: Failed to fetch data.")
}

export async function getAllAnime(param: getAllAnimeProp): Promise<ITopAnime> {
  const url = transformString(param)
  const res = await fetch(url)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnime(param: paramProps): Promise<IIndividualAnime> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnimeCharacters(
  param: paramProps
): Promise<IIndividualAnimeCharacters> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}/characters`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnimeRecommendations(
  param: paramProps
): Promise<IIndividualAnimeRecommendations> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}/recommendations`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnimeStaff(param: paramProps) {
  const url = `https://api.jikan.moe/v4/anime/${param.id}/staff`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnimeEpisodes(param: paramProps): Promise<IAnimeEpisodes> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}/episodes`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}
