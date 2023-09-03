import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

type Props = {
  title: string
  url: string
}
export const NavLinkStandalone = ({ title, url }: Props) => {
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
