export interface ITopAnime {
  pagination: ITopAnimePagination
  data: ITopAnimeData[]
}

export interface ITopAnimeData {
  mal_id: number
  url: string
  images: Image
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: null | string
  title_japanese: string
  title_synonyms: any[]
  type: string
  source: string
  episodes: number | null
  status: string
  airing: boolean
  aired: Aired
  duration: string
  rating: string
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
  broadcast: Broadcast
  producers: Producer[]
  licensors: any[]
  studios: Producer[]
  genres: any[]
  explicit_genres: any[]
  themes: Producer[]
  demographics: any[]
}

export interface Aired {
  from: Date | null
  to: Date | null
  prop: Prop
  string: string | null
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

export interface Image {
  jpg: Images
  webp: Images
}

export interface Images {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Producer {
  mal_id: number
  type: string
  name: string
  url: string
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

export interface ITopAnimePagination {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: Items
}

export interface Items {
  count: number
  total: number
  per_page: number
}
