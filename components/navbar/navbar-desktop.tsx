"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/themes/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export const NavbarDesktop = () => {
  return (
    <div className="hidden h-20 lg:block">
      <div className="container min-h-full items-center justify-between px-20 sm:flex">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-xl font-semibold tracking-tighter">
            Nunko.
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavLinkStandalone title="Anime" url="/search/anime" />
              <NavLinkStandalone title="Manga" url="/search/manga" />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <UserButtons />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export const NavLinkStandalone = ({ title, url }: { title: string; url: string }) => {
  return (
    <NavigationMenuItem>
      <Link href={url} legacyBehavior passHref>
        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-normal`}>
          {title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

const UserButtons = () => {
  return (
    <>
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
    </>
  )
}
