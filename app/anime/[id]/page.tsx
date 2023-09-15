import { AnimeCastItem } from "@/components/anime/single/characters/anime-cast-item"
import { AnimeStaffItem } from "@/components/anime/single/staff/anime-staff-item"
import { Dummy } from "@/components/dummy"
import {
  getIndividualAnime,
  getIndividualAnimeCharacters,
  getIndividualAnimeRecommendations,
  getIndividualAnimeStaff,
} from "@/lib/fetchJikan"
import { CaretRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"

export default async function IndividualAnimePage({ params }: { params: { id: string } }) {
  const { data } = await getIndividualAnime(params)

  const { data: characters } = await getIndividualAnimeCharacters(params)
  const mainCharacters = characters.filter((item) => item.role === "Main")
  const mainCharactersSorted = mainCharacters.sort((a, b) => b.favorites - a.favorites)
  const subCharacters = characters.filter((item) => item.role === "Supporting")
  const subCharactersSorted = subCharacters.sort((a, b) => b.favorites - a.favorites)
  const filteredCharacters = [...mainCharactersSorted, ...subCharactersSorted].splice(0, 6)

  const { data: staff } = await getIndividualAnimeStaff(params)
  const creator = staff.filter((item) => item.positions.includes("Original Creator"))
  const directors = staff.filter((item) => item.positions.includes("Director"))
  const episodeDirectors = staff.filter((item) => item.positions.includes("Episode Director"))
  const scripters = staff.filter((item) => item.positions.includes("Script"))
  const filteredStaff = [...creator, ...directors, ...episodeDirectors, ...scripters]
  const uniqueStaff = [
    ...new Map(filteredStaff.map((item) => [item.person["name"], item])).values(),
  ]
    .flat()
    .slice(0, 6)

  const { data: recommendations } = await getIndividualAnimeRecommendations(params)
  return (
    <>
      <section className="space-y-16">
        <section>
          <h2 className="mb-4 text-[15px] font-medium">Description</h2>
          <div className="mt-4 text-sm leading-7">{data?.synopsis}</div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-medium">Characters</h2>
            <Link
              href={`/anime/${params.id}/characters`}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground/90"
            >
              <span>View all characters</span> <CaretRightIcon />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {filteredCharacters.map((item) => (
              <AnimeCastItem key={item.character.mal_id} data={item} language={"English"} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between ">
            <h2 className="text-[15px] font-medium">Staff</h2>
            <Link
              href={`/anime/${params.id}/staff`}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground/90"
            >
              <span>View all staff</span> <CaretRightIcon />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {uniqueStaff.map((item) => (
              <AnimeStaffItem key={item.person.mal_id} data={item} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="mb-4 flex items-center justify-between ">
            <h2 className="text-[15px] font-medium">Recommendations</h2>
            <Link
              href={`/anime/${params.id}/recommendations`}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground/90"
            >
              <span>View all recommendations</span> <CaretRightIcon />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
            {recommendations.slice(0, 6).map((item) => (
              <div key={item.entry.mal_id} className="space-y-1">
                <Link href={`/anime/${item.entry.mal_id}`}>
                  {item && (
                    <Image
                      src={item.entry.images.webp.large_image_url.toString()}
                      alt={item.entry.title}
                      width={500}
                      height={500}
                      className="h-[230px] w-[150px] rounded border object-cover object-top shadow-md"
                    />
                  )}{" "}
                </Link>
                <Link href={`/anime/${item.entry.mal_id}`}>
                  <p className="max-w-[18ch] text-xs font-medium leading-5 tracking-tight text-muted-foreground">
                    {item.entry.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  )
}
