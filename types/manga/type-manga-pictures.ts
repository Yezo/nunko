export interface IMangaPictures {
  data: IMangaPicture[]
}

export interface IMangaPicture {
  jpg: Image
  webp: Image
}

export interface Image {
  image_url: string
  small_image_url: string
  large_image_url: string
}
