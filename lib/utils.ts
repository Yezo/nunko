import { getAllAnimeProp } from "@/lib/fetchJikan"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatDateToMMDDYYYY(date: Date | null) {
  if (date) {
    const formattedDate = moment(date).utc().format("MMMM D[,] YYYY")
    return formattedDate
  }
  return null
}

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60 / 1000)
  const result = `${minutes} mins`
  return result
}

export function transformString(searchParams: getAllAnimeProp, typeOfData: "anime" | "manga") {
  let url = new URL(`https://api.jikan.moe/v4/${typeOfData}`)
  let params = url.searchParams
  //Set new value
  if (searchParams.limit) params.set("limit", searchParams.limit)
  if (searchParams.page) params.set("page", searchParams.page)
  if (searchParams.sfw) params.set("sfw", "true")
  if (searchParams.rating) params.set("rating", searchParams.rating)
  if (searchParams.filter) params.set("filter", searchParams.filter)
  if (searchParams.type) params.set("type", searchParams.type)
  if (searchParams.order_by) params.set("order_by", searchParams.order_by)
  if (searchParams.sort) params.set("sort", searchParams.sort)
  if (searchParams.score) params.set("score", searchParams.score)
  if (searchParams.min_score) params.set("min_score", searchParams.min_score)
  if (searchParams.start_date) params.set("start_date", searchParams.start_date)
  if (searchParams.end_date) params.set("end_date", searchParams.end_date)
  if (searchParams.genres) params.set("genres", searchParams.genres)
  url.search = params.toString()
  let result = url.toString()
  return result
}

export function renameParameters(value: string | number) {
  const val = value && value.toString().toLowerCase()
  if (val === "tv") return "TV Show"
  if (val === "start_date") return "Release Date"
  if (val === "ova") return "OVA"
  if (val === "ona") return "ONA"
  if (val === "lightnovel") return "Light Novel"
  if (val === "oneshot") return "One-shot"
  if (val && val.toString().startsWith("20")) return val.slice(0, 4)
  if (val && val.toString().startsWith("19")) return val.slice(0, 4)
  else return val
}
