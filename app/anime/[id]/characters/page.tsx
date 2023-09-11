import { AnimeCast } from "@/components/anime/single/characters/anime-cast"
import { NoDataFound } from "@/components/layout/no-data"
import { getIndividualAnimeCharacters } from "@/lib/fetchJikan"

export default async function CharactersPage({ params }: { params: { id: string } }) {
  const { data: characters } = await getIndividualAnimeCharacters(params)

  //Sort the list of characters by ROLE first, and then sort by FAVORITES
  //This prevents seeing SUPPORTING chars with higher favorites above chars with MAIN role
  const mainCharacters = characters.filter((item) => item.role === "Main")
  const mainCharactersSorted = mainCharacters.sort((a, b) => b.favorites - a.favorites)

  const subCharacters = characters.filter((item) => item.role === "Supporting")
  const subCharactersSorted = subCharacters.sort((a, b) => b.favorites - a.favorites)

  const filteredCharacters = [...mainCharactersSorted, ...subCharactersSorted]

  return (
    <>
      {characters.length > 0 ? (
        <>{characters && <AnimeCast data={filteredCharacters} />}</>
      ) : (
        <NoDataFound type={"characters"} />
      )}
    </>
  )
}
