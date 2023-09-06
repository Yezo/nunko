import Jikan from "jikan4.js"

export default async function IndividualAnimePage({ params }: { params: { id: string } }) {
  //States
  const parsedID = parseInt(params.id)
  const client = new Jikan.Client({ secure: true })
  const data = await client.anime.get(parsedID)

  return (
    <>
      {data?.synopsis && data?.synopsis.length > 0 ? (
        <section className="space-y-4">
          <div className="mt-4 text-sm leading-7">{data?.synopsis}</div>
        </section>
      ) : null}
    </>
  )
}
