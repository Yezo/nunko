import { transformDate } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Jikan from "jikan4.js"

export default async function EpisodesPage({ params }: { params: { id: string } }) {
  //States
  const parsedID = parseInt(params.id)
  const client = new Jikan.Client({ secure: true })
  const episodes = await client.anime.getEpisodes(parsedID)

  return (
    <>
      {episodes && episodes.length > 0 ? (
        <section className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[75px] text-center">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-[150px] text-right">Aired On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {episodes.map((item) => (
                <TableRow key={item.episodeId}>
                  <TableCell className="text-center font-medium">{item.episodeId}</TableCell>
                  <TableCell>{item.title.default}</TableCell>
                  <TableCell className="text-right">
                    {item.aired && transformDate(item.aired)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : null}
    </>
  )
}
