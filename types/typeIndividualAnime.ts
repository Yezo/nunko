export interface IIndividualAnime {
  data: IIndividualAnimeData
}

export interface IIndividualAnimeData {
  mal_id: number | null
  url: string | null
  images: Image
  trailer: Trailer | null
  approved: boolean
  titles: Title[] | null
  title: string | null
  title_english: string | null
  title_japanese: string | null
  title_synonyms: string[] | null
  type: string | null
  source: string | null
  episodes: number | null
  status: string | null
  airing: boolean
  aired: Aired | null
  duration: string | null
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
  to: null
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
  day: string
  time: string
  timezone: string
  string: string
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

export interface Image {
  jpg: Images
  webp: Images
}

export interface Images {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Title {
  type: string
  title: string
}

export interface Trailer {
  youtube_id: string
  url: string
  embed_url: string
  images: Images
}
