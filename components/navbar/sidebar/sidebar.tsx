"use client"

import {
  SIDEBAR_EXPLORE_NAV_LINKS,
  SIDEBAR_LIBRARY_NAV_LINKS,
  SIDEBAR_MAIN_NAV_LINKS,
} from "@/components/navbar/sidebar/sidebar-data"
import { SidebarSearchInput } from "@/components/navbar/sidebar/sidebar-search-input"
import { ProfileDropdown } from "@/components/profile/profile-dropdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CrumpledPaperIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  username?: string | undefined
}
export const Sidebar = ({ username }: Props) => {
  const session = useSession()
  let pathname = usePathname() || "/"
  if (pathname.includes("/anime/")) pathname = "/anime"
  if (pathname.includes("/search/anime/top-100")) pathname = "/anime"

  return (
    <aside className="sticky top-0 hidden min-h-screen w-56  self-start border-r lg:grid">
      <div className="flex flex-col justify-between px-6 py-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 font-domine text-xl font-semibold tracking-tight"
          >
            <div className="rounded-full border border-muted/80 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600 via-gray-800 to-black p-1.5 text-foreground shadow-sm">
              <CrumpledPaperIcon />
            </div>
            Nunko.
          </Link>

          <SidebarSearchInput />

          <nav className="flex flex-col gap-2">
            <p className="font-medium"></p>
            {Object.entries(SIDEBAR_MAIN_NAV_LINKS).map(([path, { name, icon }]) => {
              return <LinkItem url={path} key={path} name={name} icon={icon} />
            })}

            <Separator className="my-2" />

            <p className="font-medium tracking-tight">Explore</p>
            {Object.entries(SIDEBAR_EXPLORE_NAV_LINKS).map(([path, { name, icon }]) => {
              return <LinkItem url={path} key={path} name={name} icon={icon} />
            })}

            <Separator className="my-2" />

            <p className="font-medium">Library</p>
            {Object.entries(SIDEBAR_LIBRARY_NAV_LINKS).map(([path, { name, icon }]) => {
              return <LinkItem url={path} key={path} name={name} icon={icon} />
            })}
          </nav>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://avatars.githubusercontent.com/u/6843026?v=4" />
              <AvatarFallback>
                <Skeleton className="h-8 w-8 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div>
              {session.status === "authenticated" ? (
                <span className="capitalize"> {username} </span>
              ) : (
                <Skeleton className="h-[20px] w-[100px] rounded-md" />
              )}
            </div>
          </div>

          <ProfileDropdown />
        </div>
      </div>
    </aside>
  )
}

export const LinkIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded border border-muted/80 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-900 to-gray-800 p-1.5 shadow-sm">
      {children}
    </div>
  )
}

export const LinkItem = ({ url, icon, name }: { url: string; icon: JSX.Element; name: string }) => {
  return (
    <Link
      href={url}
      className="group/list-item hover:text-slate-0 flex h-9 w-full flex-row items-center justify-start gap-2 truncate rounded-md text-sm  capitalize text-slate-300 transition-colors hover:text-white"
    >
      <LinkIcon>{icon}</LinkIcon>
      {name}
    </Link>
  )
}
