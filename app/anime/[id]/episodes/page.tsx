import { formatDateToMMDDYYYY } from "@/lib/utils"
import { getIndividualAnimeEpisodes } from "@/lib/fetchJikan"
import { NoDataFound } from "@/components/layout/no-data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function EpisodesPage({ params }: { params: { id: string } }) {
  const episodes = await getIndividualAnimeEpisodes(params)

  return (
    <>
      {episodes.data.length > 0 ? (
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
                  <TableCell className="text-right">{formatDateToMMDDYYYY(item.aired)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <NoDataFound type={"episodes"} />
      )}
    </>
  )
}
