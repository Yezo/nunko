"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/themes/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarSearchInput } from "@/components/navbar/sidebar/sidebar-search-input"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import {
  DesktopIcon,
  ExitIcon,
  GearIcon,
  HamburgerMenuIcon,
  HeartIcon,
  HomeIcon,
  ImageIcon,
  LaptopIcon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons"
import { navConfig } from "@/config/nav"

type MobileNavbarProps = {
  username: string
}
export const MobileNavbar = ({ username }: MobileNavbarProps) => {
  const [open, setOpen] = useState(false)
  const session = useSession()
  let pathname = usePathname() || "/"
  if (pathname.includes("/anime/")) pathname = "/anime"

  return (
    <div className="h-20 border-b lg:hidden">
      <div className="container flex min-h-full items-center justify-between ">
        <Link href="/" className="text-xl font-semibold tracking-tighter">
          Nunko.
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <HamburgerMenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
              <div>
                <Link href="/" className="text-xl font-semibold tracking-tighter">
                  Nunko.
                </Link>
                <SidebarSearchInput setOpen={setOpen} />
                <nav className="flex flex-col gap-2">
                  <p className="font-medium">Explore</p>

                  {navConfig.mobileNav.map((item) => (
                    <LinkItem url={item.href} name={item.title} icon={item.icon} key={item.title} />
                  ))}

                  <Separator className="my-2" />
                  {session.status === "authenticated" && (
                    <>
                      <p className="font-medium">Library</p>
                      <LinkItem
                        url={`/user/${session.data?.user?.name?.toLowerCase()}`}
                        name="Profile"
                        icon={<PersonIcon />}
                      />
                      <LinkItem
                        url={`/user/${session.data?.user?.name?.toLowerCase()}/animelist`}
                        name="My Anime"
                        icon={<LaptopIcon />}
                      />
                      <LinkItem
                        url={`/user/${session.data?.user?.name?.toLowerCase()}/mangalist`}
                        name="My Manga"
                        icon={<ReaderIcon />}
                      />
                      <LinkItem url="/settings" name="Settings" icon={<GearIcon />} />
                      <LinkItem url="/developer" name="Developer" icon={<HeartIcon />} />
                      <div
                        className="group/list-item flex h-9 w-full cursor-pointer flex-row items-center justify-start gap-2 truncate rounded-md text-sm capitalize text-muted-foreground  transition-colors hover:text-foreground dark:text-slate-300 dark:hover:text-white"
                        onClick={() => signOut()}
                      >
                        <LinkIcon>
                          <ExitIcon />
                        </LinkIcon>
                        Sign Out
                      </div>
                    </>
                  )}
                </nav>
              </div>

              {session.status === "authenticated" ? (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded-full">
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
                </div>
              ) : (
                <div className="flex flex-col gap-4 pb-4">
                  <Link
                    href="/signup"
                    className="rounded-md bg-foreground px-6 py-3 text-center text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/signin"
                    className="rounded-md border border-muted-foreground/40 bg-transparent px-6 py-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
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
