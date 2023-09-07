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

export const transformDate = (date: unknown) => {
  if (date instanceof Date) {
    return "ERROR"
  }
  if (typeof date === "string") {
    const d = moment(date).utc().format("MMMM D[,] YYYY")
    return d
  }
}

export const getMonthName = (monthNumber: number | undefined) => {
  if (monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber - 1)

    return date.toLocaleString("en-US", {
      month: "long",
    })
  }
  return
}

export const formatDuration = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60 / 1000)
  const result = `${minutes} mins`
  return result
}

export const transformString = (searchParams: getAllAnimeProp) => {
  let url = new URL("https://api.jikan.moe/v4/anime")
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
