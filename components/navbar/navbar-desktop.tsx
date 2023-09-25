"use client"

import { animeItems, mangaItems } from "@/components/navbar/nav-data"
import { NavlinkMenuItem } from "@/components/navbar/navlink-menuitem"
import { NavLinkStandalone } from "@/components/navbar/navlink-standalone"
import { ThemeToggle } from "@/components/themes/theme-toggle"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const NavbarDesktop = () => {
  return (
    <div className="hidden h-20   lg:block">
      <div className="container min-h-full items-center justify-between px-20 sm:flex">
        <Link href="/" className="font-domine text-xl font-semibold tracking-tight">
          Nunko.
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavLinkStandalone title="About" url="/" />
            <NavLinkStandalone title="Pricing" url="/" />
            <NavLinkStandalone title="Anime" url="/search/anime" />
            {/* <NavlinkMenuItem title="Anime" data={animeItems} /> */}
            <NavlinkMenuItem title="Manga" data={mangaItems} />
            <NavLinkStandalone title="Changelog" url="/" />
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Get Started
          </Link>
          <Link
            href="/signin"
            className="rounded-md border border-muted-foreground/40 bg-transparent px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground"
          >
            Sign in
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
