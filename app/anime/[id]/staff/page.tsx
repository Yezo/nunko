import { AnimeStaffItem } from "@/components/anime/single/staff/anime-staff-item"
import { NoDataFound } from "@/components/layout/no-data"
import { getIndividualAnimeStaff } from "@/lib/fetchJikan"

export default async function StaffPage({ params }: { params: { id: string } }) {
  const { data: staff } = await getIndividualAnimeStaff(params)
  const creator = staff.filter((item) => item.positions.includes("Original Creator"))
  const directors = staff.filter((item) => item.positions.includes("Director"))
  const episodeDirectors = staff.filter((item) => item.positions.includes("Episode Director"))
  const scripters = staff.filter((item) => item.positions.includes("Script"))
  const remainingStaff = staff.filter(
    (item) =>
      !item.positions.includes("Original Creator") &&
      !item.positions.includes("Director") &&
      !item.positions.includes("Episode Director") &&
      !item.positions.includes("Script")
  )
  const filteredStaff = [
    ...creator,
    ...directors,
    ...episodeDirectors,
    ...scripters,
    ...remainingStaff,
  ]
  const uniqueStaff = [
    ...new Map(filteredStaff.map((item) => [item.person["name"], item])).values(),
  ].flat()

  return (
    <>
      {staff ? (
        <>
          {
            <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {uniqueStaff.map((item, index) => (
                <AnimeStaffItem key={index} data={item} />
              ))}
            </div>
          }
        </>
      ) : (
        <NoDataFound type={"staff"} />
      )}
    </>
  )
}
