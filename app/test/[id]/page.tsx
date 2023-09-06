import { Sidebar } from "@/components/navbar/sidebar/sidebar"
//@ts-ignore
import jikanjs from "@mateoaranda/jikanjs"
import { Dummy } from "@/components/dummy"
import { IIndividualAnime } from "@/types/typeIndividualAnime"

type PromiseFulfilledResult<T> = {
  status: "fulfilled"
  value: T
}

export default async function TestPage({ params }: { params: { id: string } }) {
  //States
  const parsedID = parseInt(params.id)

  const { data }: IIndividualAnime = await jikanjs.loadAnime(parsedID)

  return (
    <div className="flex">
      <Sidebar />
      <Dummy data={data} />
      <main className="container mx-auto flex-1 px-4">
        {data.title_english}
        {data.title_japanese}
      </main>
    </div>
  )
}
