import { MainContainer } from "@/components/layout/main"
import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { ThemeToggle } from "@/components/themes/theme-toggle"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="container mx-auto flex-1 px-4">
        <div className="text-[16px] font-light">Product</div>
        <div className="text-[16px] font-light">Pricing</div>
        <div className="text-[16px] font-light">Company</div>
      </main>
    </div>
  )
}
