import { AnimeCast } from "@/components/anime/anime-cast"
import { Dummy } from "@/components/dummy"
import { getIndividualAnimeCharacters } from "@/lib/fetchJikan"

export default async function CharactersPage({ params }: { params: { id: string } }) {
  const { data: characters } = await getIndividualAnimeCharacters(params)

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
