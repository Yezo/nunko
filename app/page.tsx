import { ThemeToggle } from "@/components/themes/theme-toggle"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hi</Button>
      <ThemeToggle />
    </main>
  )
}
