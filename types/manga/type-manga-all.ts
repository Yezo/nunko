export interface ITopMangas {
  pagination: Pagination
  data: ITopManga[]
}

export interface ITopManga {
  mal_id: number
  url: string
  images: Images
  approved: boolean
  titles: Title[]
  title: string
  title_english: null | string
  title_japanese: string | null
  title_synonyms: string[] | null
  type: DatumType
  chapters: number | null
  volumes: number | null
  status: Status
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
  authors: Author[]
  serializations: Author[]
  genres: Author[]
  explicit_genres: any[]
  themes: Author[]
  demographics: Author[]
}

export interface Author {
  mal_id: number
  type: AuthorType
  name: string
  url: string
}

export enum AuthorType {
  Manga = "manga",
  People = "people",
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

export enum Status {
  Finished = "Finished",
  OnHiatus = "On Hiatus",
  Publishing = "Publishing",
}

export interface Title {
  type: TitleType
  title: string
}

export enum TitleType {
  Default = "Default",
  English = "English",
  French = "French",
  German = "German",
  Japanese = "Japanese",
  Spanish = "Spanish",
  Synonym = "Synonym",
}

export enum DatumType {
  Manga = "Manga",
}

export interface Pagination {
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
