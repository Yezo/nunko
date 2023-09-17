import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { FullscreenLoadingWithSession } from "@/components/layout/loading/fullscreen/fullscreen-session"
import { FullscreenLoadingWithNoSession } from "@/components/layout/loading/fullscreen/fullscreen-no-session"
export default async function Loading() {
  const session = await getServerSession(authOptions)
  return (
    <>
      {!session && <FullscreenLoadingWithNoSession />}
      {session && <FullscreenLoadingWithSession />}
    </>
  )
}
