export interface IAnimeStaffs {
  data: IAnimeStaffData[]
}

export interface IAnimeStaffData {
  person: Person
  positions: string[]
}

export interface Person {
  mal_id: number
  url: string
  images: Images
  name: string
}

export interface Images {
  jpg: Jpg
}

export interface Jpg {
  image_url: string
}
