"use client"

import { IAnimeReview, IAnimeReviews } from "@/types/anime/type-anime-reviews"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import moment from "moment"

type AnimeReviewContainerProps = {
  reviews: IAnimeReview[]
  params: { id: string }
}
export const AnimeReviewContainer = ({ reviews, params }: AnimeReviewContainerProps) => {
  const [data, setData] = useState(reviews)
  const [spoilerData, setSpoilerData] = useState<IAnimeReview[] | null>(null)
  const [toggleSpoiler, setToggleSpoiler] = useState(false)
  const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false)

  const generateDate = (date: Date) => {
    const finalDate = moment(date).utc().format("MMMM D[,] YYYY")
    return finalDate
  }

  const generateScoreColor = (value: number) => {
    if (value >= 5) return "bg-green-800"
    if (value < 5) return "bg-red-800"
  }

  const handleClick = async () => {
    //setButtonHasBeenClicked is to prevent extra fetches even after its been fetched once already
    //although I'm pretty sure it gets cached by Next.js either way
    setButtonHasBeenClicked(true)
    setToggleSpoiler(!toggleSpoiler)

    //If the spoiler button is being clicked for the first time, then fetch the new data
    if (!buttonHasBeenClicked) {
      const news: IAnimeReviews = await (
        await fetch(
          `https://api.jikan.moe/v4/anime/${params.id}/reviews?spoilers=true&preliminary=true`
        )
      ).json()
      const { data } = news
      setSpoilerData(data)
    }
  }

  return (
    <>
      <div className="flex items-center justify-end space-x-2">
        <Switch id="toggle-spoiler" onClick={handleClick} />
        <Label htmlFor="toggle-spoiler">Show Spoilers</Label>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {toggleSpoiler
          ? buttonHasBeenClicked &&
            spoilerData &&
            spoilerData.map((item) => (
              <div key={item.mal_id} className="flex flex-col gap-4 rounded border p-4">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={item.user.images.webp.image_url} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ">
                      <div className="font-bold">{item.user.username} </div>
                      {item.date && (
                        <div className="text-xs font-medium text-muted-foreground">
                          {generateDate(item.date)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded border text-2xl font-semibold ${generateScoreColor(
                        item.score
                      )}`}
                    >
                      {item.score}
                    </div>
                  </div>
                </div>

                <ScrollArea className="h-[210px] w-full rounded-md border-none p-4 pr-8 text-sm">
                  {item.review}
                </ScrollArea>
                <div className="px-4">
                  {item.tags
                    .filter((item) => item !== "Preliminary")
                    .map((item, index) => (
                      <Badge key={index} variant="outline">
                        {item}
                      </Badge>
                    ))}
                </div>
              </div>
            ))
          : data.map((item) => (
              <div key={item.mal_id} className="flex flex-col gap-4 rounded border p-4">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={item.user.images.webp.image_url} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ">
                      <div className="font-bold">{item.user.username} </div>
                      {item.date && (
                        <div className="text-xs font-medium text-muted-foreground">
                          {generateDate(item.date)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded border text-2xl font-semibold ${generateScoreColor(
                        item.score
                      )}`}
                    >
                      {item.score}
                    </div>
                  </div>
                </div>

                <ScrollArea className="h-[210px] w-full rounded-md border-none p-4 pr-8 text-sm">
                  {item.review}
                </ScrollArea>
                <div className="px-4">
                  {item.tags
                    .filter((item) => item !== "Preliminary")
                    .map((item, index) => (
                      <Badge key={index} variant="outline">
                        {item}
                      </Badge>
                    ))}
                </div>
              </div>
            ))}
      </div>
    </>
  )
}
