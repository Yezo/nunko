import "./globals.css"

import { ThemeProvider } from "@/components/themes/theme-provider"
import { NavbarDesktop } from "@/components/navbar/navbar-desktop"
import { domine, inter } from "@/lib/fonts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nunko",
  description: "Companion app for your anime & manga",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${domine.variable}`}>
      <body className="min-h-screen bg-background font-inter antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavbarDesktop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}