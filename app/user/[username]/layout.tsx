import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
import { Main } from "@/components/layout/main"
import { UserProfileNavigation } from "@/components/navbar/tabs/tab"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Footer } from "@/components/footer/footer"

export default async function IndividualAnimePageLayout({
  params,
  children,
}: {
  params: { username: string }
  children: React.ReactNode
}) {
  return (
    <main className="container mx-auto flex-1 px-4 py-20 sm:px-8 md:px-12 lg:px-40">
      <div className="flex items-center gap-4 pb-4">
        <Avatar className="h-20 w-20 rounded-full border">
          <AvatarImage src="https://avatars.githubusercontent.com/u/6843026?v=4" />
          <AvatarFallback>
            <Skeleton className="h-20 w-20 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold capitalize">{params.username}</h1>
      </div>

      <UserProfileNavigation username={params.username} />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </main>
  )
}
