import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { MiniLoadingWithNoSession } from "@/components/layout/loading/mini/mini-no-session"
import { MiniLoadingWithSession } from "@/components/layout/loading/mini/mini-session"
export default async function Loading() {
  const session = await getServerSession(authOptions)
  return (
    <>
      {!session && <MiniLoadingWithNoSession />}
      {session && <MiniLoadingWithSession />}
    </>
  )
}
