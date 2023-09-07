import { Dummy } from "@/components/dummy"
import { getIndividualAnimeStaff } from "@/lib/fetchJikan"

export default async function StaffPage({ params }: { params: { id: string } }) {
  const { data: staff } = await getIndividualAnimeStaff(params)

  return (
    <div>
      <Dummy data={staff} />
      Staff
      {/* <iframe
        width="650"
        height="400"
        src={episodes?.promos[4].trailer.embedUrl.toString()}
      ></iframe> */}
    </div>
  )
}
