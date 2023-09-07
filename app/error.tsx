"use client"

import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { Button } from "@/components/ui/button"
import { ReloadIcon, ResetIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()
  const statusCode = parseInt(error.message.slice(0, 3))
  const handleGoBackOnePage = () => router.back()

  return (
    <div className="flex">
      <Sidebar />

      <main className="container mx-auto grid flex-1 place-items-center px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Something went wrong!</h2>
            <p className="text-sm text-muted-foreground">
              {statusCode === 400 && "The developer did something incorrect with his code."}
              {statusCode === 404 && "The resource could be not be found or does not exist."}
              {statusCode === 429 && "You're currently rate-limited due to too many requests."}
              {statusCode === 500 && "There was a server issue or something unusual happened."}
            </p>
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
