import { AnimeListFeatureButton } from "@/components/anime/single/features/feature-button"
import { ReadingBookSVG, EyeSVG, BookmarkSVG, CheckmarkSVG } from "@/lib/icons"

export const FeatureContainer = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <AnimeListFeatureButton title="Add entry">
        <ReadingBookSVG />
      </AnimeListFeatureButton>

      <AnimeListFeatureButton title="Watching">
        <EyeSVG />
      </AnimeListFeatureButton>

      <AnimeListFeatureButton title="Watch Later">
        <BookmarkSVG />
      </AnimeListFeatureButton>

      <AnimeListFeatureButton title="Completed">
        <CheckmarkSVG />
      </AnimeListFeatureButton>
    </div>
  )
}
