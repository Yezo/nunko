import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const LinkItem = ({
  title,
  description,
  href,
  icon,
  comingSoon,
}: {
  title: string
  description: string
  href: string
  icon: React.JSX.Element
  comingSoon?: boolean
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        {!comingSoon ? (
          <Link
            className={cn(
              `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`
            )}
            href={href}
          >
            <div className="flex items-center gap-2 text-sm font-normal leading-none">
              <div className="inline-flex rounded-full bg-blue-600 p-1.5 text-white shadow-sm">
                {icon}
              </div>
              {title}
            </div>
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{description}</p>
          </Link>
        ) : (
          <div
            className={cn(
              `block cursor-default select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none grayscale transition-colors
           `
            )}
          >
            <div className="flex items-center gap-2 text-sm font-normal leading-none">
              <span className="inline-flex rounded-full bg-blue-600 p-1.5 text-white shadow-sm">
                {icon}
              </span>
              <span>{title}</span>
              <div className="rounded-full bg-blue-600 px-2 py-0.5 text-[0.6rem] tracking-wide text-white dark:text-black">
                COMING SOON
              </div>
            </div>
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{description}</p>
          </div>
        )}
      </NavigationMenuLink>
    </li>
  )
}
