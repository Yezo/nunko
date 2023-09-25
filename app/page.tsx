import { Main } from "@/components/layout/main"
import { ChevronRightIcon, FaceIcon } from "@radix-ui/react-icons"
import { Footer } from "@/components/footer/footer"
import Link from "next/link"
import Image from "next/image"

export default async function Home() {
  return (
    <Main>
      <section className="grid place-items-center space-y-12 py-12 pb-10 sm:py-20">
        <div className="grid  place-items-center gap-8 sm:gap-5">
          <Link
            href="/signup"
            className="bg:b flex select-none items-center gap-2 rounded-full border border-blue-500/10 bg-blue-600/10 px-3 py-1 text-xs font-medium leading-5 text-blue-500 dark:border-sky-300/10 dark:bg-sky-400/10 dark:text-sky-300"
          >
            <FaceIcon />
            Nunko 1.0 is finally here.
          </Link>

          <h1 className="max-w-[600px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-5xl font-medium leading-tight tracking-tight text-transparent">
            The new standard to discover, enjoy and track your favorite titles
          </h1>
          <p className="max-w-[350px] text-center font-medium text-muted-foreground">
            Managing your anime and manga doesn't have to be hard with Nunko.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/signup"
            className="flex items-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Get Started <ChevronRightIcon />
          </Link>
          <Link
            href="/signin"
            className="flex items-center rounded-md border border-muted-foreground/40 bg-transparent px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground"
          >
            Sign in <ChevronRightIcon />
          </Link>
        </div>

        <div className="py-20">
          <div className="grid items-start justify-center gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-bl from-blue-600 to-blue-400 opacity-50 blur transition duration-1000 group-hover:opacity-80 group-hover:duration-200 dark:from-sky-600 dark:to-sky-200"></div>
              <Image
                src="/hero.png"
                height={500}
                width={1100}
                className="relative rounded-xl object-cover "
                alt="Picture of greek statue"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-40 py-10" id="features">
        <div className="grid grid-cols-2 gap-12">
          <div className="grid place-items-center">
            <h2 className="max-w-[400px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-4xl font-medium leading-tight tracking-tight text-transparent">
              Discover existing and new titles with your own filtering
            </h2>
          </div>

          <div className="min-h-[400px] rounded-md p-4">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-bl from-blue-600 to-blue-400 opacity-50 blur transition duration-1000 group-hover:opacity-80 group-hover:duration-200 dark:from-sky-600 dark:to-sky-200"></div>
              <Image
                src="/anime.png"
                height={1100}
                width={1100}
                className="relative rounded-xl object-cover "
                alt="Picture of greek statue"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="min-h-[400px] rounded-md p-4">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-bl from-blue-600 to-blue-400 opacity-50 blur transition duration-1000 group-hover:opacity-80 group-hover:duration-200 dark:from-sky-600 dark:to-sky-200"></div>
              <Image
                src="/profile.png"
                height={500}
                width={1100}
                className="relative rounded-xl object-cover "
                alt="Picture of greek statue"
                quality={100}
                priority
              />
            </div>
          </div>
          <div className="grid place-items-center">
            <h2 className="max-w-[400px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-4xl font-medium leading-tight tracking-tight text-transparent">
              Track your favorite anime and manga by adding them to your collections
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="grid place-items-center">
            <h2 className="max-w-[400px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-4xl font-medium leading-tight tracking-tight text-transparent">
              Personal statistics to show your daily, weekly, and lifetime progress
            </h2>
          </div>

          <div className="min-h-[400px] rounded-md p-4">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-bl from-blue-600 to-blue-400 opacity-50 blur transition duration-1000 group-hover:opacity-80 group-hover:duration-200 dark:from-sky-600 dark:to-sky-200"></div>
              <Image
                src="/stats.png"
                height={500}
                width={1100}
                className="relative rounded-xl object-cover "
                alt="Picture of greek statue"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="min-h-[400px] rounded-md p-4">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-bl from-blue-600 to-blue-400 opacity-50 blur transition duration-1000 group-hover:opacity-80 group-hover:duration-200 dark:from-sky-600 dark:to-sky-200"></div>
              <Image
                src="/feed.png"
                height={500}
                width={1100}
                className="relative rounded-xl object-cover "
                alt="Picture of greek statue"
                quality={100}
                priority
              />
            </div>
          </div>
          <div className="grid place-items-center">
            <h2 className="max-w-[400px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-4xl font-medium leading-tight tracking-tight text-transparent">
              Find out what the rest of the world is up to with our global activity feed
            </h2>
          </div>
        </div>
      </section>

      <section className="grid place-items-center space-y-12 py-12 pb-10 sm:pt-40">
        <div className="grid  place-items-center gap-8 sm:gap-5">
          <Link
            href="/signup"
            className="bg:b flex select-none items-center gap-2 rounded-full border border-blue-500/10 bg-blue-600/10 px-3 py-1 text-xs font-medium leading-5 text-blue-500 dark:border-sky-300/10 dark:bg-sky-400/10 dark:text-sky-300"
          >
            Join Nunko today - enjoy forever
          </Link>

          <h2 className="max-w-[650px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-5xl font-medium leading-tight tracking-tight text-transparent">
            The next generational platform for all things anime and manga
          </h2>
        </div>

        <div className="flex gap-4">
          <Link
            href="/signup"
            className="flex items-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Sign up for free <ChevronRightIcon />
          </Link>
        </div>
      </section>

      <Footer />
    </Main>
  )
}
