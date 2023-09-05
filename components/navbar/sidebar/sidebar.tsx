import { ThemeToggle } from "@/components/themes/theme-toggle"
import Link from "next/link"

type Props = {}
export const Sidebar = ({}: Props) => {
  return (
    <aside className="sticky top-0 hidden min-h-screen w-56 place-items-center self-start border-r lg:grid">
      <div className="flex flex-col gap-4">
        <Link href="/anime/1">Cowboy Bebop</Link>
        <Link href="/anime/21">One Piece</Link>
        <Link href="/anime/54538">Zombies</Link>

        <Link href="/search/anime/top-100">Top 100</Link>
        <ThemeToggle />
      </div>
    </aside>
  )
}
