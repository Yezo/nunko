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
  "/movies": {
    name: "movies",
    icon: <ReaderIcon />,
  },
  "/anime/1": {
    name: "cowboy bebop",
    icon: <ReaderIcon />,
  },
  "/anime/21": {
    name: "one piece",
    icon: <ReaderIcon />,
  },
  "/anime/10": {
    name: "error page",
    icon: <ExclamationTriangleIcon />,
  },
}

export const SIDEBAR_LIBRARY_NAV_LINKS = {
  "/DSADSA": {
    name: "profile",
    icon: <PersonIcon />,
  },
  "/manga": {
    name: "my anime",
    icon: <LaptopIcon />,
  },
  "/movies": {
    name: "my manga",
    icon: <ReaderIcon />,
  },
}
