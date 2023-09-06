import { AnimeCast } from "@/components/anime/anime-cast"
import Jikan from "jikan4.js"

export default async function CharactersPage({ params }: { params: { id: string } }) {
  //States
  const parsedID = parseInt(params.id)
  const client = new Jikan.Client({ secure: true })
  const characters = await client.anime.getCharacters(parsedID)

  return <>{characters && <AnimeCast data={characters} />}</>
}
