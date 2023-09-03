import { LinkItem } from "@/components/navbar/link-item"
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

type Props = {
  title: string
  data: {
    title: string
    href: string
    description: string
    icon: JSX.Element
    comingSoon?: boolean
  }[]
}
export const NavlinkMenuItem = ({ title, data }: Props) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-normal">{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {data.map(({ title, href, icon, description, comingSoon }) => (
            <LinkItem
              title={title}
              href={href}
              icon={icon}
              description={description}
              key={title}
              comingSoon={comingSoon}
            ></LinkItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}
