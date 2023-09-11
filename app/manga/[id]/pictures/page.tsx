import { getIndividualMangaPictures } from "@/lib/fetchJikan"
import { NoDataFound } from "@/components/layout/no-data"
import Image from "next/image"

export default async function MangaPicturesPage({ params }: { params: { id: string } }) {
  const { data: pictures } = await getIndividualMangaPictures(params)

  return (
    <>
      {pictures.length > 0 ? (
        <section className="grid grid-cols-4 gap-2">
          {pictures.map((item, index) => (
            <div className="relative h-60 w-full md:h-[295px] md:w-[215px]" key={index}>
              <Image
                src={item.webp.large_image_url.toString()}
                alt={`Manga Picture: ${index}`}
                fill
                className="h-full w-full rounded border object-cover object-center shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </section>
      ) : (
        <NoDataFound type={"pictures"} />
      )}
    </>
  )
}
