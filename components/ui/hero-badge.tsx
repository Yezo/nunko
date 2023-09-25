import Link from "next/link"

export const HeroBadge = ({ url, children }: { url: string; children: React.ReactNode }) => {
  return (
    <Link
      href={url}
      className="flex select-none items-center gap-2 rounded-full border border-blue-500/10 bg-blue-600/10 px-3 py-1 text-xs font-medium leading-5 text-blue-500 dark:border-sky-300/10 dark:bg-sky-400/10 dark:text-sky-300"
    >
      {children}
    </Link>
  )
}
