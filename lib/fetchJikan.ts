import { transformString } from "@/lib/utils"
import { IIndividualAnime } from "@/types/typeIndividualAnime"
import { IIndividualAnimeCharacters } from "@/types/typeIndividualAnimeChars"
import { IIndividualAnimeRecommendations } from "@/types/typeIndividualAnimeRecommendations"
import { ITopAnime } from "@/types/typeTopAnime"

export type getIndividualAnimeProp = {
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

export async function getAllAnime(searchParams: getAllAnimeProp): Promise<ITopAnime> {
  const url = transformString(searchParams)
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export async function getIndividualAnime(
  searchParams: getIndividualAnimeProp
): Promise<IIndividualAnime> {
  const url = `https://api.jikan.moe/v4/anime/${searchParams.id}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export async function getIndividualAnimeCharacters(
  searchParams: getIndividualAnimeProp
): Promise<IIndividualAnimeCharacters> {
  const url = `https://api.jikan.moe/v4/anime/${searchParams.id}/characters`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export async function getIndividualAnimeRecommendations(
  searchParams: getIndividualAnimeProp
): Promise<IIndividualAnimeRecommendations> {
  const url = `https://api.jikan.moe/v4/anime/${searchParams.id}/recommendations`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export async function getIndividualAnimeStaff(searchParams: getIndividualAnimeProp) {
  const url = `https://api.jikan.moe/v4/anime/${searchParams.id}/staff`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export async function getIndividualAnimeEpisodes(searchParams: getIndividualAnimeProp) {
  const url = `https://api.jikan.moe/v4/anime/${searchParams.id}/episodes`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
