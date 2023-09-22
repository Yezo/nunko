export interface IAnime {
  data: IAnimeData
}

export interface IAnimeData {
  mal_id: number
  url: string
  images: Images
  trailer: Trailer | null
  approved: boolean
  titles: Title[]
  title: string
  title_english: string | null
  title_japanese: string | null
  title_synonyms: string[] | null
  type: string | null
  source: string | null
  episodes: number | null
  status: string
  airing: boolean
  aired: Aired
  duration: string
  rating: string | null
  score: number | null
  scored_by: number | null
  rank: number | null
  popularity: number | null
  members: number | null
  favorites: number | null
  synopsis: string | null
  background: string | null
  season: string | null
  year: number | null
  broadcast: Broadcast | null
  producers: Demographic[] | null
  licensors: Demographic[] | null
  studios: Demographic[] | null
  genres: Demographic[] | null
  explicit_genres: any[] | null
  themes: any[] | null
  demographics: Demographic[] | null
}

export interface Aired {
  from: Date
  to: Date | null
  prop: Prop
  string: string
}

export interface Prop {
  from: From
  to: From
}

export interface From {
  day: number | null
  month: number | null
  year: number | null
}

export interface Broadcast {
  day: string | null
  time: string | null
  timezone: string | null
  string: string | null
}

export interface Demographic {
  mal_id: number
  type: Type
  name: string
  url: string
}

export enum Type {
  Anime = "anime",
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

export interface Title {
  type: string
  title: string
}

export interface Trailer {
  youtube_id: string | null
  url: string | null
  embed_url: string | null
  images: Images
}

export interface TrailerImages {
  image_url: string | null
  small_image_url: string | null
  large_image_url: string | null
  maximum_image_url: string | null
  medium_image_url: string | null
}
