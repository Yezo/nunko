const jikanjs = require("@mateoaranda/jikanjs")
import { transformDate } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IAnimeEpisodes } from "@/types/typeEpisodes"

async function getData(id: string) {
  try {
    const data: IAnimeEpisodes = await jikanjs.loadAnime(id, "episodes")
    return data
  } catch (error) {
    return "error"
  }
}

export default async function EpisodesPage({ params }: { params: { id: string } }) {
  const episodes = await getData(params.id)

  return (
    <>
      {typeof episodes === "string" ? (
        <div className="flex">
          <div className="container mx-auto flex-1 px-4">There was an error.</div>
        </div>
      ) : (
        <>
          <section className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[75px] text-center">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-[100px] text-center">Score</TableHead>
                  <TableHead className="w-[175px] text-right">Aired On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {episodes.data.map((item) => (
                  <TableRow key={item.mal_id}>
                    <TableCell className="text-center font-medium">{item.mal_id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="text-center">{item.score}</TableCell>
                    <TableCell className="text-right">{transformDate(item.aired)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </>
      )}
    </>
  )
}
