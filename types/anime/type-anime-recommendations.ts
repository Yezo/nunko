export interface IAnimeRecommendations {
  data: IAnimeRecommendation[]
}

export interface IAnimeRecommendation {
  entry: Entry
  url: string
  votes: number
}

export interface Entry {
  mal_id: number
  url: string
  images: Images
  title: string
}

export interface Images {
  jpg: Image
  webp: Image
}

export interface Image {
  image_url: string
  small_image_url: string
  large_image_url: string
}
