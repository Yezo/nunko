import { Dummy } from "@/components/dummy"
import Jikan from "jikan4.js"
type Props = {}

export default async function ReviewsPage({ params }: { params: { id: string } }) {
  //States
  const parsedID = parseInt(params.id)
  const client = new Jikan.Client({ secure: true })
  const episodes = await client.anime.getVideos(parsedID)
  return (
    <div>
      <Dummy data={episodes} />
      <iframe
        width="650"
        height="400"
        src={episodes?.promos[4].trailer.embedUrl.toString()}
      ></iframe>
    </div>
  )
}
