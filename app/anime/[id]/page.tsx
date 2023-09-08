import { Dummy } from "@/components/dummy"
import { getIndividualAnime } from "@/lib/fetchJikan"

export default async function IndividualAnimePage({ params }: { params: { id: string } }) {
  const { data } = await getIndividualAnime(params)

  return (
    <>
      <section className="space-y-4">
        <div className="mt-4 text-sm leading-7">{data?.synopsis}</div>
      </section>

      <Dummy data={data} />
    </>
  )
}
