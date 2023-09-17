import "./globals.css"

import type { Metadata } from "next"
import { ThemeProvider } from "@/components/themes/theme-provider"
import { NavbarDesktop } from "@/components/navbar/navbar-desktop"
import { domine, inter } from "@/lib/fonts"
import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { MobileNavbar } from "@/components/navbar/mobile/mobile-navbar"
import { AuthProvider } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const metadata: Metadata = {
  title: "Nunko",
  description: "Companion app for your anime & manga",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${domine.variable}`}>
        <body className="min-h-screen bg-background font-inter antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MobileNavbar />
            {!session && <NavbarDesktop />}
            <div className="flex">
              {session && <Sidebar />}
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
