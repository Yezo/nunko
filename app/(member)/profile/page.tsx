import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Main } from "@/components/layout/main"
import { getServerSession } from "next-auth"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  return <Main>{session?.user?.id}</Main>
}
