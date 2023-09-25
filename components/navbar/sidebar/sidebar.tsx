"use client"

import {
  SIDEBAR_EXPLORE_NAV_LINKS,
  SIDEBAR_MAIN_NAV_LINKS,
} from "@/components/navbar/sidebar/sidebar-data"
import { SidebarSearchInput } from "@/components/navbar/sidebar/sidebar-search-input"
import { ProfileDropdown } from "@/components/profile/profile-dropdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { LaptopIcon, PersonIcon, ReaderIcon } from "@radix-ui/react-icons"
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

  return (
    <aside className="sticky top-0 hidden min-h-screen w-56  self-start border-r lg:grid">
      <div className="flex flex-col justify-between px-6 py-8">
        <div>
          <Link href="/" className="text-xl font-semibold tracking-tighter">
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
            {/* {Object.entries(SIDEBAR_LIBRARY_NAV_LINKS).map(([path, { name, icon }]) => {
              return <LinkItem url={path} key={path} name={name} icon={icon} />
            })} */}
            <Link
              href={`/user/${session.data?.user?.name?.toLowerCase()}`}
              className="group/list-item flex h-9 w-full flex-row items-center justify-start gap-2 truncate rounded-md text-sm capitalize text-muted-foreground transition-colors  hover:text-foreground dark:text-slate-300 dark:hover:text-white"
            >
              <LinkIcon>
                <PersonIcon />
              </LinkIcon>
              Profile
            </Link>

            <Link
              href={`/user/${session.data?.user?.name?.toLowerCase()}/animelist`}
              className="group/list-item flex h-9 w-full flex-row items-center justify-start gap-2 truncate rounded-md text-sm capitalize text-muted-foreground transition-colors  hover:text-foreground dark:text-slate-300 dark:hover:text-white"
            >
              <LinkIcon>
                <LaptopIcon />
              </LinkIcon>
              My Anime
            </Link>

            <Link
              href={`/user/${session.data?.user?.name?.toLowerCase()}/mangalist`}
              className="group/list-item flex h-9 w-full flex-row items-center justify-start gap-2 truncate rounded-md text-sm capitalize text-muted-foreground transition-colors  hover:text-foreground dark:text-slate-300 dark:hover:text-white"
            >
              <LinkIcon>
                <ReaderIcon />
              </LinkIcon>
              My Manga
            </Link>
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
                <span className="font-medium capitalize"> {username} </span>
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
    <div className="rounded border border-foreground/[.01] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-100 via-gray-200 to-gray-300 p-1.5 text-foreground/60 shadow-sm dark:border-foreground/[0.05] dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-gray-900 dark:to-gray-800 dark:text-slate-300 ">
      {children}
    </div>
  )
}

export const LinkItem = ({ url, icon, name }: { url: string; icon: JSX.Element; name: string }) => {
  return (
    <Link
      href={url}
      className="group/list-item flex h-9 w-full flex-row items-center justify-start gap-2 truncate rounded-md text-sm capitalize text-muted-foreground transition-colors  hover:text-foreground dark:text-slate-300 dark:hover:text-white"
    >
      <LinkIcon>{icon}</LinkIcon>
      {name}
    </Link>
  )
}
