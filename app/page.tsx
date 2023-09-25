import { Main } from "@/components/layout/main"
import { ChevronRightIcon, FaceIcon } from "@radix-ui/react-icons"
import { Footer } from "@/components/footer/footer"
import Link from "next/link"
import Image from "next/image"
import { HeroBadge } from "@/components/ui/hero-badge"

export default async function Home() {
  return (
    <Main>
      <section className="grid place-items-center space-y-12 py-12 pb-10 sm:py-20">
        <div className="grid place-items-center gap-8 sm:gap-5">
          <HeroBadge url="/signup">
            <FaceIcon />
            Nunko 1.0 is finally here.
          </HeroBadge>

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
        <FeatureItem
          imageURL="/anime.png"
          imageALT="An image of Nunko's anime and manga search page"
          headline="Discover existing and new titles with your own filtering"
        />

        <FeatureItem
          imageURL="/profile.png"
          imageALT="An image of Nunko's user profile page"
          headline="Track your favorite anime and manga by adding them to your collections"
          reverse={true}
        />

        <FeatureItem
          imageURL="/stats.png"
          imageALT="An image of Nunko's statistics page"
          headline="Personal statistics to show your daily, weekly, and lifetime progress"
        />

        <FeatureItem
          imageURL="/feed.png"
          imageALT="An image of Nunko's activity feed page"
          headline="Find out what the rest of the world is up to with our global activity feed"
          reverse={true}
        />
      </section>

      <section className="grid place-items-center space-y-12 py-12 pb-10 sm:pt-40">
        <div className="grid place-items-center gap-8 sm:gap-5">
          <HeroBadge url="/signup">
            <FaceIcon />
            Join Nunko today - enjoy forever
          </HeroBadge>

          <h2 className="max-w-[650px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-5xl font-medium leading-tight tracking-tight text-transparent">
            The next generational platform for all things anime and manga
          </h2>
        </div>

        <Link
          href="/signup"
          className="flex items-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Sign up for free <ChevronRightIcon />
        </Link>
      </section>

      <Footer />
    </Main>
  )
}

type FeatureItemProps = {
  imageURL: string
  imageALT: string
  headline: string
  reverse?: boolean
}

const FeatureItem = ({ imageURL, imageALT, headline, reverse }: FeatureItemProps) => {
  return (
    <div className={`flex gap-12 md:flex-row ${reverse ? "flex-col" : "flex-col-reverse"}`}>
      {reverse ? (
        <>
          <div className="grid flex-1 place-items-center">
            <h2 className="max-w-[400px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-4xl font-medium leading-tight tracking-tight text-transparent">
              {headline}
            </h2>
          </div>
          <div className="min-h-[400px] flex-1 rounded-md p-4">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-bl from-blue-600 to-blue-400 opacity-50 blur transition duration-1000 group-hover:opacity-80 group-hover:duration-200 dark:from-sky-600 dark:to-sky-200"></div>
              <Image
                src={imageURL}
                height={500}
                width={1100}
                className="relative rounded-xl object-cover"
                alt={imageALT}
                quality={100}
                priority
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-[400px] flex-1 rounded-md p-4">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-bl from-blue-600 to-blue-400 opacity-50 blur transition duration-1000 group-hover:opacity-80 group-hover:duration-200 dark:from-sky-600 dark:to-sky-200"></div>
              <Image
                src={imageURL}
                height={500}
                width={1100}
                className="relative rounded-xl object-cover"
                alt={imageALT}
                quality={100}
                priority
              />
            </div>
          </div>
          <div className="grid flex-1 place-items-center">
            <h2 className="max-w-[400px] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-center text-4xl font-medium leading-tight tracking-tight text-transparent">
              {headline}
            </h2>
          </div>
        </>
      )}
    </div>
  )
}
