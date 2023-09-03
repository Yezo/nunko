import { MainContainer } from "@/components/layout/main"
import { ThemeToggle } from "@/components/themes/theme-toggle"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <MainContainer>
      <Button>Hi</Button>
      <p className="font-inter text-2xl tracking-tight">Nunko</p>
      <p className="font-domine text-2xl tracking-tight">Nunko</p>
      <p className="font-inter text-2xl tracking-tight">The co-op bookstore for avid readers</p>
      <p className="font-domine text-2xl tracking-tight">The co-op bookstore for avid readers</p>

      <ThemeToggle />
    </MainContainer>
  )
}
