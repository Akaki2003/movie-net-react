export class MovieClass {
  title: string
  year: number
  hr: string
  genre: string
  description: string
  img: string
  color: string
  color2: string
  video: string
  constructor(
    title: string,
    year: number,
    hr: string,
    genre: string,
    description: string,
    img: string,
    color: string,
    color2: string,
    video: string,
  ) {
    this.title = title
    this.year = year
    this.hr = hr
    this.genre = genre
    this.description = description
    this.img = img
    this.color = color
    this.color2 = color2
    this.video = video
  }
}
