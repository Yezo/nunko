import { ANIME_MAIN_GENRES_DATA } from "@/components/anime/top/anime-data"

export function renameParameters(value: string | number) {
  const val = (value && value.toString().toLowerCase()) as string

  switch (val) {
    case "tv":
      return "TV Show"
    case "start_date":
      return "Release Date"
    case "order_by":
      return "Sort"
    case "ova":
      return "OVA"
    case "ona":
      return "ONA"
    case "lightnovel":
      return "Light Novel"
    case "oneshot":
      return "One-shot"
    default:
      if (val && val.toString().startsWith("20")) return val.slice(0, 4)
      if (val && val.toString().startsWith("19")) return val.slice(0, 4)
      return val
  }
}

export const findParamValue = (paramName: string, params: URLSearchParams) => {
  // Convert query parameters to an array of key-value pairs
  const splitParams = Array.from(params.entries())
  // Find the matching parameter by its name
  const matchingParam = splitParams.find(([param]) => param === paramName)
  // Return the value of the matching parameter, or an empty string if not found
  return matchingParam ? matchingParam[1] : ""
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

export const calculatePlaceholderText = (searchParams: URLSearchParams, BASE_TYPE: string) => {
  const params = new URLSearchParams(searchParams)
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
  searchParams: URLSearchParams,
  data: {
    genre: string
    id: string
  }[]
) => {
  const params = new URLSearchParams(searchParams)

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
