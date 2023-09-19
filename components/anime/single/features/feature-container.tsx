import { AnimeListFeatureButton } from "@/components/anime/single/features/feature-button"
import { ReadingBookSVG, EyeSVG, BookmarkSVG, CheckmarkSVG } from "@/lib/icons"
import { IAnimeData } from "@/types/anime/type-anime"

type FeatureContainerProps = {
  data: IAnimeData
}
export const FeatureContainer = ({ data }: FeatureContainerProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <AnimeListFeatureButton title="Add entry" data={data}>
        <ReadingBookSVG />
      </AnimeListFeatureButton>

      <AnimeListFeatureButton title="Watching" data={data}>
        <EyeSVG />
      </AnimeListFeatureButton>

      <AnimeListFeatureButton title="Watch Later" data={data}>
        <BookmarkSVG />
      </AnimeListFeatureButton>

      <AnimeListFeatureButton title="Completed" data={data}>
        <CheckmarkSVG />
      </AnimeListFeatureButton>
    </div>
  )
}
