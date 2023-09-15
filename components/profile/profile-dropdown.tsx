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
          className="flex cursor-pointer items-center gap-2 text-muted-foreground text-slate-300 transition-colors hover:text-foreground"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <LinkIcon>{theme === "dark" ? <MoonIcon /> : <SunIcon />}</LinkIcon>
          <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <MenuItem url="/" title="Sign Out">
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
}: {
  url: string
  title: string
  children: React.ReactNode
}) => {
  return (
    <Link href={url}>
      <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-muted-foreground text-slate-300 transition-colors hover:text-foreground">
        <LinkIcon>{children}</LinkIcon>
        <span>{title}</span>
      </DropdownMenuItem>
    </Link>
  )
}
