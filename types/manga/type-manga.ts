export interface IManga {
  data: IMangaData
}

export interface IMangaData {
  mal_id: number
  url: string
  images: Images
  approved: boolean
  titles: Title[]
  title: string
  title_english: string | null
  title_japanese: string | null
  title_synonyms: any[] | null
  type: string
  chapters: number | null
  volumes: number | null
  status: string
  publishing: boolean
  published: Published
  score: number | null
  scored: number | null
  scored_by: number | null
  rank: number | null
  popularity: number | null
  members: number | null
  favorites: number | null
  synopsis: string | null
  background: string | null
  authors: Author[] | null
  serializations: Author[] | null
  genres: Author[] | null
  explicit_genres: any[] | null
  themes: Author[] | null
  demographics: Author[] | null
}

export interface Author {
  mal_id: number
  type: string
  name: string
  url: string
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

export interface Published {
  from: Date | null
  to: Date | null
  prop: Prop
  string: string | null
}

export interface Prop {
  from: From | null
  to: From | null
}

export interface From {
  day: number | null
  month: number | null
  year: number | null
}

export interface Title {
  type: string
  title: string
}
