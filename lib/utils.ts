import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatDateToMMDDYYYY(date: Date | undefined) {
  return date ? moment(date).utc().format("MMMM D[,] YYYY") : undefined
}

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60 / 1000)
  return `${minutes} mins`
}

export type SearchParams = {
  limit?: number
  page?: number
  sfw?: boolean
  rating?: string
  filter?: string
  type?: string
  order_by?: string
  sort?: string
  score?: number
  min_score?: number
  start_date?: string
  end_date?: string
  genres?: string
  q?: string
  [key: string]: string | number | boolean | undefined
}

export function transformString(
  searchParams: SearchParams,
  typeOfData: "anime" | "manga",
  page = 1,
  query: string
) {
  const baseUrl = `https://api.jikan.moe/v4/${typeOfData}?limit=18&page=${page}&q=${query}`
  const searchParamsMap: Record<string, string> = {
    limit: "limit",
    page: "page",
    sfw: "sfw",
    rating: "rating",
    filter: "filter",
    type: "type",
    order_by: "order_by",
    sort: "sort",
    score: "score",
    min_score: "min_score",
    start_date: "start_date",
    end_date: "end_date",
    genres: "genres",
    q: "q",
  }

  const url = new URL(baseUrl)

  for (const param in searchParams) {
    if (searchParams[param] !== undefined && searchParamsMap[param]) {
      url.searchParams.set(searchParamsMap[param], String(searchParams[param]))
    }
  }

  return url.toString()
}
