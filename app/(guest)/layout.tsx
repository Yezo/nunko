import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

type Props = {
  children: React.ReactNode
}
export default async function Component({ children }: Props) {
  //This layout is for routes that you want to PREVENT USERS FROM SEEING and then get REDIRECTED
  const session = await getServerSession(authOptions)
  //If the user isn't logged in, then redirect to profile/dashboard
  //TODO this should redirect to /feed after you finish building it
  // if (session) redirect("/search/anime")
  return <>{children}</>
}
