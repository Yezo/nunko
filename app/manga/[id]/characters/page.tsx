import { NoDataFound } from "@/components/layout/no-data"
import { MangaCast } from "@/components/manga/single/characters/manga-cast"
import { getIndividualMangaCharacters } from "@/lib/fetchJikan"

export default async function MangaCharactersPage({ params }: { params: { id: string } }) {
  const { data: characters } = await getIndividualMangaCharacters(params)

  //Sort the list of characters by MAIN role and then SUPPORTING role
  const mainCharacters = characters.filter((item) => item.role === "Main")
  const subCharacters = characters.filter((item) => item.role === "Supporting")

  const filteredCharacters = [...mainCharacters, ...subCharacters]

  return (
    <>
      {characters.length > 0 ? (
        <>{characters && <MangaCast data={filteredCharacters} />}</>
      ) : (
        <NoDataFound type={"characters"} />
      )}
    </>
  )
}
