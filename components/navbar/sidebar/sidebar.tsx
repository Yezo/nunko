import { ThemeToggle } from "@/components/themes/theme-toggle"
import Link from "next/link"

type Props = {}
export const Sidebar = ({}: Props) => {
  return (
    <aside className="sticky top-0 hidden min-h-screen w-56  self-start border-r lg:grid">
      <div className="flex flex-col gap-4">
        <Link href="/" className="mb-20 font-domine text-xl font-semibold tracking-tight">
          Nunko.
        </Link>

        <p className="font-medium">Explore</p>
        <Link href="/" className="text-muted-foreground">
          Home
        </Link>
        <Link href="/" className="text-muted-foreground">
          Feed
        </Link>

        <p className="font-medium">Explore</p>
        <Link href="/" className="text-muted-foreground">
          Anime
        </Link>
        <Link href="/" className="text-muted-foreground">
          Manga
        </Link>
        <Link href="/anime/21" className="text-muted-foreground">
          One Piece
        </Link>
        <Link href="/anime/54538" className="text-muted-foreground">
          Zombies
        </Link>

        <Link href="/search/anime/top-100">Top 100</Link>
        <ThemeToggle />
      </div>
    </aside>
  )
}
