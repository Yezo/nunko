import { SearchParams, transformString, wait } from "@/lib/utils"
import { IAnime } from "@/types/anime/type-anime"
import { IAnimeCharacters } from "@/types/anime/type-anime-characters"
import { IAnimeEpisodes } from "@/types/anime/type-anime-episodes"
import { IAnimeNews } from "@/types/anime/type-anime-news"
import { IAnimeRecommendations } from "@/types/anime/type-anime-recommendations"
import { IAnimeReviews } from "@/types/anime/type-anime-reviews"
import { IAnimeStaffs } from "@/types/anime/type-anime-staff"
import { ITopAnime } from "@/types/anime/type-top-anime"
import { IManga } from "@/types/manga/type-manga"
import { ITopMangas } from "@/types/manga/type-manga-all"
import { IMangaCharacters } from "@/types/manga/type-manga-characters"
import { IMangaPictures } from "@/types/manga/type-manga-pictures"
import { IMangaRecommendations } from "@/types/manga/type-manga-recommendations"
import { IMangaReviews } from "@/types/manga/type-manga-reviews"

export type paramProps = {
  id: string
}

export type queryProps = {
  query: string
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

export const errorMessages: { [key: string]: string } = {
  400: "The developer did something incorrect with his code.",
  404: "The resource could be not be found or does not exist.",
  429: "You're currently rate-limited due to too many requests.",
  500: "Something unusual occured. Please try again.",
}
//Error handler

export const handleResponseError = (res: Response) => {
  if (res && res instanceof Response) {
    const statusCode = res.status.toString()

    if (statusCode !== "200" && errorMessages[statusCode]) {
      throw new Error(`${statusCode}: ${errorMessages[statusCode]}`)
    }
  } else {
    throw new Error("Invalid response object.")
  }
}

//! ======== ANIME SECTION ========

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

export async function getIndividualAnime(param: paramProps): Promise<IAnime> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnimeCharacters(param: paramProps): Promise<IAnimeCharacters> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}/characters`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnimeRecommendations(
  param: paramProps
): Promise<IAnimeRecommendations> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}/recommendations`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnimeStaff(param: paramProps): Promise<IAnimeStaffs> {
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

export async function getIndividualAnimeReviews(param: paramProps): Promise<IAnimeReviews> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}/reviews?preliminary=true`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualAnimeNews(param: paramProps): Promise<IAnimeNews> {
  const url = `https://api.jikan.moe/v4/anime/${param.id}/news`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getSearchAnime(query: string): Promise<ITopAnime> {
  const url = `https://api.jikan.moe/v4/anime?q=${query}`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

//! ======== MANGA SECTION ========

export async function getIndividualManga(param: paramProps): Promise<IManga> {
  const url = `https://api.jikan.moe/v4/manga/${param.id}`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualMangaCharacters(param: paramProps): Promise<IMangaCharacters> {
  const url = `https://api.jikan.moe/v4/manga/${param.id}/characters`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualMangaRecommendations(
  param: paramProps
): Promise<IMangaRecommendations> {
  const url = `https://api.jikan.moe/v4/manga/${param.id}/recommendations`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualMangaReviews(param: paramProps): Promise<IMangaReviews> {
  const url = `https://api.jikan.moe/v4/manga/${param.id}/reviews?preliminary=true`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}

export async function getIndividualMangaPictures(param: paramProps): Promise<IMangaPictures> {
  const url = `https://api.jikan.moe/v4/manga/${param.id}/pictures`
  const res = await fetch(url)
  await wait(MS)
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

export async function getSearchManga(query: string): Promise<ITopMangas> {
  const url = `https://api.jikan.moe/v4/manga?q=${query}`
  const res = await fetch(url)
  await wait(MS)
  handleResponseError(res)

  return res.json()
}
