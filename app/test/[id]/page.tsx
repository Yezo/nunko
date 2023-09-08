import { Dummy } from "@/components/dummy"
import { getIndividualAnime, getIndividualAnimeStaff } from "@/lib/fetchJikan"

export default async function TestPage({ params }: { params: { id: string } }) {
  const data = await getIndividualAnime(params)

  return (
    <>
      <Dummy data={data} />
    </>
  )
}
