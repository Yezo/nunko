const jikanjs = require("@mateoaranda/jikanjs")
import { AnimeCast } from "@/components/anime/anime-cast"
import { Dummy } from "@/components/dummy"
import { IIndividualAnimeCharacters } from "@/types/typeIndividualAnimeChars"

async function getData(id: string) {
  try {
    const { data }: IIndividualAnimeCharacters = await jikanjs.loadAnime(id, "characters")
    return data
  } catch (error) {
    return "error"
  }
}

export default async function CharactersPage({ params }: { params: { id: string } }) {
  const characters = await getData(params.id)
  return (
    <>
      {typeof characters === "string" ? (
        <div className="flex">
          <div className="container mx-auto flex-1 px-4">There was an error.</div>
        </div>
      ) : (
        <>
          {characters && <AnimeCast data={characters.sort((a, b) => b.favorites - a.favorites)} />}
          <Dummy data={characters} />
        </>
      )}
    </>
  )
}
