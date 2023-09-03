import { Inter, Domine } from "next/font/google"

export const inter = Inter({
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
})

export const domine = Domine({
  variable: "--font-domine",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
})
