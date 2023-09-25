import { DesktopIcon, HomeIcon, ImageIcon, TargetIcon } from "@radix-ui/react-icons"

export const navConfig = {
  desktopNav: [
    {
      title: "Anime",
      href: "/search/anime",
    },
    {
      title: "Manga",
      href: "/search/manga",
    },
  ],
  mobileNav: [
    {
      title: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Anime",
      href: "/search/anime",
      icon: <DesktopIcon />,
    },
    {
      title: "Manga",
      href: "/search/manga",
      icon: <ImageIcon />,
    },
  ],
  sidebarNav: [
    {
      title: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Feed",
      href: "/feed",
      icon: <TargetIcon />,
    },
  ],
  sidebarExploreNav: [
    {
      title: "Anime",
      href: "/search/anime",
      icon: <DesktopIcon />,
    },
    {
      title: "Manga",
      href: "/search/manga",
      icon: <ImageIcon />,
    },
  ],
}
