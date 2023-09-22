"use client"

import { LinkIcon } from "@/components/navbar/sidebar/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DotsVerticalIcon,
  ExitIcon,
  GearIcon,
  HeartIcon,
  MoonIcon,
  Pencil2Icon,
  PersonIcon,
  SunIcon,
} from "@radix-ui/react-icons"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"

export const ProfileDropdown = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <DotsVerticalIcon className="h-[1rem] w-[1rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4 my-2 w-[190px]" align="end" alignOffset={100}>
        <DropdownMenuLabel className="font-medium">My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <MenuItem url="/profile" title="Profile">
          <PersonIcon />
        </MenuItem>

        <MenuItem url="/settings" title="Settings">
          <GearIcon />
        </MenuItem>

        <DropdownMenuSeparator />

        <MenuItem url="/" title="Feedback">
          <Pencil2Icon />
        </MenuItem>

        <MenuItem url="/" title="Developer">
          <HeartIcon />
        </MenuItem>

        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2 transition-colors hover:text-foreground dark:text-muted-foreground dark:text-slate-300"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <LinkIcon>{theme === "light" ? <MoonIcon /> : <SunIcon />}</LinkIcon>
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <MenuItem url="/" title="Sign Out" onClick={() => signOut()}>
          <ExitIcon />
        </MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MenuItem = ({
  url,
  title,
  children,
  onClick,
}: {
  url: string
  title: string
  children: React.ReactNode
  onClick?: () => Promise<undefined>
}) => {
  return (
    <Link href={url} onClick={onClick}>
      <DropdownMenuItem className="flex cursor-pointer items-center gap-2 transition-colors hover:text-foreground dark:text-muted-foreground dark:text-slate-300">
        <LinkIcon>{children}</LinkIcon>
        <span>{title}</span>
      </DropdownMenuItem>
    </Link>
  )
}
