import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

type Props = {
  children: React.ReactNode
}
export default async function Component({ children }: Props) {
  //This layout is for routes that you want to PREVENT NON-USERS FROM SEEING and then get REDIRECTED
  const session = await getServerSession(authOptions)
  //If the user isn't logged in, then redirect to login page
  if (!session?.user) redirect("/login")
  return <>{children}</>
}
