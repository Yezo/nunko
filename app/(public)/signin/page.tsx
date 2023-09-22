import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { SignInForm } from "@/components/forms/signin-account"
import { getServerSession } from "next-auth/next"
import Image from "next/image"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  return (
    <main className="h-[calc(100vh-80px)] min-w-full md:flex">
      <section className="flex-1">
        <div className="grid min-h-full place-items-center p-4 sm:px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-60">
          <SignInForm />
        </div>
      </section>

      <section className="relative flex-1">
        <Image
          src="/door.webp"
          fill
          className="object-cover"
          alt="Picture of a door"
          quality={100}
          priority
          sizes="(min-width: 808px) 50vw, 100vw"
        ></Image>
      </section>
    </main>
  )
}
