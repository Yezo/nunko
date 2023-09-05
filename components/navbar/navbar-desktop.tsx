"use client"

import { animeItems, mangaItems } from "@/components/navbar/nav-data"
import { NavlinkMenuItem } from "@/components/navbar/navlink-menuitem"
import { NavLinkStandalone } from "@/components/navbar/navlink-standalone"
import { ThemeToggle } from "@/components/themes/theme-toggle"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import Link from "next/link"

export const NavbarDesktop = () => {
  return (
    <div className="h-20 border-b ">
      <div className="container min-h-full items-center justify-between px-20 sm:flex">
        <Link href="/" className="font-domine text-xl font-semibold tracking-tight">
          Nunko.
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavLinkStandalone title="About" url="/" />
            <NavLinkStandalone title="Pricing" url="/" />
            <NavLinkStandalone
              title="Anime"
              url="/search/anime/top-100?sort=desc&order_by=favorites&min_score=1"
            />
            {/* <NavlinkMenuItem title="Anime" data={animeItems} /> */}
            <NavlinkMenuItem title="Manga" data={mangaItems} />
            <NavLinkStandalone title="Changelog" url="/" />
          </NavigationMenuList>
        </NavigationMenu>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
