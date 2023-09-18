import {
  DesktopIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  ImageIcon,
  LaptopIcon,
  PersonIcon,
  ReaderIcon,
  TargetIcon,
} from "@radix-ui/react-icons"

export const SIDEBAR_MAIN_NAV_LINKS = {
  "/": {
    name: "home",
    icon: <HomeIcon />,
  },
  "/feed": {
    name: "feed",
    icon: <TargetIcon />,
  },
}

export const SIDEBAR_EXPLORE_NAV_LINKS = {
  "/search/anime": {
    name: "anime",
    icon: <DesktopIcon />,
  },
  "/search/manga": {
    name: "manga",
    icon: <ImageIcon />,
  },
}

export const SIDEBAR_LIBRARY_NAV_LINKS = {
  "/profile": {
    name: "profile",
    icon: <PersonIcon />,
  },
  "/search/anime": {
    name: "my anime",
    icon: <LaptopIcon />,
  },
  "/search/manga": {
    name: "my manga",
    icon: <ReaderIcon />,
  },
}
