import { ANIME_MAIN_GENRES_DATA } from "@/components/anime/top/anime-data"
import { ReadonlyURLSearchParams } from "next/navigation"

const renamedParametersList: { [key: string]: string } = {
  tv: "TV Show",
  start_date: "Release Date",
  order_by: "Sort",
  ova: "OVA",
  ona: "ONA",
  lightnovel: "Light Novel",
  oneshot: "One-shot",
}

export function renameParameters(value: string | number) {
  const valueAsString = String(value).toLowerCase()

  if (valueAsString in renamedParametersList) {
    return renamedParametersList[valueAsString]
  }

  //Checks for years that start with 19 or 20
  const yearRegex = /^(19|20)\d{2}-\d{2}-\d{2}$/
  if (valueAsString && yearRegex.test(valueAsString)) return valueAsString.slice(0, 4)

  return valueAsString
}

export const findParamValue = (paramName: string, params: URLSearchParams) => {
  return params.get(paramName) || ""
}

export const handleOrderBySort = (name: string, value: string, params: URLSearchParams) => {
  // Modify the 'sort' query parameter based on the selected value
  if (value === "popularity" || value === "rank") {
    params.set("sort", "asc") // Set 'sort' to 'asc' for popularity or rank
  } else {
    params.set("sort", "desc") // Set 'sort' to 'desc' for other values
  }
}

export const handleStartDate = (value: string, params: URLSearchParams) => {
  // Modify the 'end_date' query parameter based on the selected value
  const sliced = value.slice(0, 5)
  const endDate = sliced + "12-31" // Append "12-31" to get an end date
  params.set("end_date", endDate) // Set 'end_date' in the query parameters
}

export const handleGenre = (
  value: string,
  params: URLSearchParams,
  data: {
    genre: string
    id: string
  }[]
) => {
  // Modify the 'genres' query parameter based on the selected genre name
  const filteredGenreId = getGenreIdFromName(value, data)
  params.set("genres", filteredGenreId) // Set 'genres' in the query parameters
}

export const getGenreIdFromName = (
  genreName: string,
  data: {
    genre: string
    id: string
  }[]
) => {
  // Convert a genre name to its corresponding ID using the data source
  const lowercaseGenreName = genreName.toLowerCase()
  const genre = data.find((item) => item.genre.toLowerCase() === lowercaseGenreName)
  return genre ? genre.id : ""
}

export const getGenreNameFromId = (genreId: string) => {
  // Convert a genre ID to its corresponding name using the data source
  const genre = ANIME_MAIN_GENRES_DATA.find((item) => item.id === genreId)
  return genre ? genre.genre : ""
}

export const calculatePlaceholderText = (
  searchParams: ReadonlyURLSearchParams,
  BASE_TYPE: string
) => {
  const params = new URLSearchParams(searchParams.toString())
  const filteredParam = findParamValue(BASE_TYPE, params)

  if (filteredParam) {
    if (BASE_TYPE === "genres") {
      return getGenreNameFromId(filteredParam) // Display the genre name
    }

    if (BASE_TYPE === "start_date" && filteredParam) {
      // Trim the date to display only the year in the placeholder text
      return filteredParam.slice(0, 4)
    }
    return renameParameters(filteredParam) // Display the renamed parameter
  }

  // Return the default value of BASE_TYPE when nothing is selected
  return renameParameters("All") // You can customize the default value here
}

export const createQueryString = (
  BASE_TYPE: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
  data: {
    genre: string
    id: string
  }[]
) => {
  const params = new URLSearchParams(searchParams.toString())

  // Modify the query parameters based on the selected name and value
  if (BASE_TYPE === "genres") {
    const genreId = getGenreIdFromName(value, data)
    params.set("genres", genreId) // Set 'genres' based on genre name
  } else {
    params.set(BASE_TYPE, value) // Set other query parameters
  }

  if (BASE_TYPE === "order_by") {
    handleOrderBySort(BASE_TYPE, value, params) // Handle 'sort' based on selected value
  }

  return params.toString()
}
