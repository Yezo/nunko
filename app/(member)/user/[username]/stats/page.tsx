import { Main } from "@/components/layout/main"
import { UserProfileNavigation } from "@/components/navbar/tabs/tab"

export default async function UserStatsPage({ params }: { params: { username: string } }) {
  return (
    <section className="grid min-h-[625px] place-items-center rounded border p-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=""
        >
          <path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" />
          <circle cx="10" cy="13" r="8" />
          <path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" />
          <path d="M18 3 19.1 5.2" />
          <path d="M22 3 20.9 5.2" />
        </svg>
        <div className="text-center">
          <div className="text-lg font-medium tracking-tight text-foreground">Coming soon!</div>
          <div className="text-center text-sm text-muted-foreground">
            We're working hard™ on this feature.
          </div>
        </div>
      </div>
    </section>
  )
}
