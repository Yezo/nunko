"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface UserProfileNavigationProps {
  username: string
}

const TABS = [
  { label: "Overview", route: "/" },
  { label: "Anime List", route: "/animelist" },
  { label: "Manga List", route: "/mangalist" },
  { label: "Favorites", route: "/favorites" },
  { label: "Stats", route: "/stats" },
  { label: "Collections", route: "/collections" },
  { label: "Social", route: "/social" },
  { label: "Recommendations", route: "/recommendations" },
]

export function UserProfileNavigation({ username }: UserProfileNavigationProps) {
  const pathname = usePathname()
  const selectedTab =
    TABS.find((t) => t.route.includes(pathname.split("/").at(-1) || "")) || TABS[0]

  return (
    <nav className="custom-scroll pointer-events-auto relative mb-6 overflow-x-auto pb-2">
      <Tabs defaultValue={selectedTab.route}>
        <TabsList aria-label="Competition Navigation">
          {TABS.map((tab) => (
            <Link href={`/user/${username}${tab.route}`} key={tab.route}>
              <TabsTrigger value={tab.route}>{tab.label}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  )
}
