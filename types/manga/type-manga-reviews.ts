export interface IMangaReviews {
  pagination: Pagination
  data: IMangaReview[]
}

export interface IMangaReview {
  mal_id: number
  url: string
  type: Type
  reactions: Reactions
  date: Date
  review: string
  score: number
  tags: Tag[]
  is_spoiler: boolean
  is_preliminary: boolean
  episodes_watched: null
  user: User
}

export interface Reactions {
  overall: number
  nice: number
  love_it: number
  funny: number
  confusing: number
  informative: number
  well_written: number
  creative: number
}

export enum Tag {
  MixedFeelings = "Mixed Feelings",
  NotRecommended = "Not Recommended",
  Recommended = "Recommended",
  Preliminary = "Preliminary",
}

export enum Type {
  Manga = "manga",
}

export interface User {
  url: string
  username: string
  images: Images
}

export interface Images {
  jpg: Image
  webp: Image
}

export interface Image {
  image_url: string
}

export interface Pagination {
  last_visible_page: number
  has_next_page: boolean
}
