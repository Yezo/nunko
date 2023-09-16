"use client"

import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { Button } from "@/components/ui/button"
import { errorMessages } from "@/lib/fetchJikan"
import { ReloadIcon, ResetIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()
  const statusCode = error.message.slice(0, 3)
  const statusMessage = error.message.slice(5)
  const handleGoBackOnePage = () => router.back()

  return (
    <div className="flex">
      <Sidebar />

      <main className="container mx-auto grid flex-1 place-items-center px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-center text-foreground"
            >
              <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
              <path d="M4 6h.01" />
              <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
              <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
              <path d="M12 18h.01" />
              <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
              <circle cx="12" cy="12" r="2" />
              <path d="m13.41 10.59 5.66-5.66" />
            </svg>
            <div>
              <h2 className="font-domine text-lg font-medium">Something went wrong!</h2>
              <p className="text-sm text-muted-foreground">{`${errorMessages[statusCode]}`}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => reset()}>
              <ReloadIcon className="mr-2 h-4 w-4" /> Try again
            </Button>

            <Button onClick={handleGoBackOnePage} variant="secondary">
              <ResetIcon className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
