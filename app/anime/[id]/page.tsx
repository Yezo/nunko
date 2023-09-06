import { getData } from "@/app/anime/[id]/layout"

export default async function IndividualAnimePage({ params }: { params: { id: string } }) {
  const data = await getData(params.id)

  return (
    <>
      {typeof data === "string" ? (
        <div className="flex">
          <div className="container mx-auto flex-1 px-4">There was an error.</div>
        </div>
      ) : (
        <section className="space-y-4">
          <div className="mt-4 text-sm leading-7">{data?.synopsis}</div>
        </section>
      )}
    </>
  )
}
