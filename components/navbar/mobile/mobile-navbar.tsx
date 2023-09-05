"use client"

import { mangaItems } from "@/components/navbar/nav-data"
import { NavlinkMenuItem } from "@/components/navbar/navlink-menuitem"
import { NavLinkStandalone } from "@/components/navbar/navlink-standalone"
import { ThemeToggle } from "@/components/themes/theme-toggle"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const MobileNavbar = () => {
  return (
    <div className="h-20 border-b lg:hidden">
      <div className="container flex min-h-full items-center justify-between ">
        <Link href="/" className="font-domine text-xl font-semibold tracking-tight">
          Nunko.
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            <HamburgerMenuIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
