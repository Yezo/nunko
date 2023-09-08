export interface IAnimeNews {
  pagination: Pagination
  data: IAnimeNewsData[]
}

export interface IAnimeNewsData {
  mal_id: number
  url: string
  title: string
  date: Date
  author_username: string
  author_url: string
  forum_url: string
  images: Images
  comments: number
  excerpt: string
}

export interface Images {
  jpg: Jpg
}

export interface Jpg {
  image_url: string
}

export interface Pagination {
  last_visible_page: number
  has_next_page: boolean
}
