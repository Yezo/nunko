import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { CreateAccountForm } from "@/components/forms/signup-account"
import { SignInForm } from "@/components/forms/signin-account"
import { getServerSession } from "next-auth/next"
import { SignOutButton } from "@/components/forms/signout-button"
import { Main } from "@/components/layout/main"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <Main>
      {session ? "The session has been initiated" : "There is no session yet."}
      <SignInForm />
      <CreateAccountForm />
      <SignOutButton />
    </Main>
  )
}
