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
import { IUser } from "@/app/(member)/settings/page"
import { handleResponseError } from "@/lib/fetchJikan"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: "Nunko",
    template: "%s | Nunko",
  },
  description: "The next generational platform for all things anime and manga",
  openGraph: {
    title: "Nunko",
    description: "The next generational platform for all things anime and manga",
    url: "https://nunko-amber.vercel.app/",
    siteName: "Nunko",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "Nunko",
    card: "summary_large_image",
  },
}

async function fetchUser(id: string | undefined): Promise<IUser> {
  const url = `http://nunko-amber.vercel.app/api/user/${id}`
  const res = await fetch(url)
  handleResponseError(res)
  return res.json()
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const { user } = await fetchUser(session?.user?.id)
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${domine.variable}`}>
        <body className="min-h-screen bg-background font-inter antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MobileNavbar username={user?.name} />
            {!session && <NavbarDesktop />}
            <div className="flex">
              {session && <Sidebar username={user?.name} />}
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
