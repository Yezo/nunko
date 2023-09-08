export interface ITopAnime {
  pagination: ITopAnimePagination
  data: ITopAnimeData[]
}

export interface ITopAnimeData {
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
  producers: Producer[]
  licensors: Producer[]
  studios: Producer[]
  genres: Producer[]
  explicit_genres: any[]
  themes: Producer[]
  demographics: Producer[]
}
export interface Genres {
  mal_id: number
  type: string
  name: string
  url: string
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

export interface Images {
  jpg: Image
  webp: Image
}

export interface Image {
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
