export interface IIndividualAnimeRecommendations {
  data: IIndividualAnimeRecommendationsData[]
}

export interface IIndividualAnimeRecommendationsData {
  entry: Entry
  url: string
  votes: number
}

export interface Entry {
  mal_id: number
  url: string
  images: Image
  title: string
}

export interface Image {
  jpg: Images
  webp: Images
}

export interface Images {
  image_url: string
  small_image_url: string
  large_image_url: string
}
