import type { Metadata, Viewport } from "next"
import { Bebas_Neue, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

import LenisProvider  from "@/components/layout/LenisProvider"
import GrainOverlay   from "@/components/layout/GrainOverlay"
import CustomCursor   from "@/components/layout/CustomCursor"
import LoadingScreen  from "@/components/layout/LoadingScreen"
import Navigation     from "@/components/layout/Navigation"
import Footer         from "@/components/layout/Footer"
import LayoutClient   from "@/components/layout/LayoutClient"

// Self-hosted variable font — covers all weights 200–700
const clash = localFont({
  src: "../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  display:  "swap",
  weight:   "200 700",
})

const bebas = Bebas_Neue({
  weight:   "400",
  variable: "--font-bebas",
  display:  "swap",
  subsets:  ["latin"],
})

const jakarta = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  variable: "--font-jakarta",
  display:  "swap",
  weight:   ["300", "400", "500", "600", "700"],
})

const jetbrains = JetBrains_Mono({
  subsets:  ["latin"],
  variable: "--font-jetbrains",
  display:  "swap",
  weight:   ["400", "500"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://soyl.agency"),
  title:       "SOYL Agency — AI-Native Digital Partner",
  description: "India's first AI-native digital operations partner for businesses that refuse to stay small. Brand, web, AI agents, marketing — all under one roof.",
  keywords:    ["AI agency India", "digital agency Bengaluru", "AI automation", "web design India", "SOYL"],
  authors:     [{ name: "SOYL Agency" }],
  openGraph: {
    title:       "SOYL Agency — Story Of Your Life",
    description: "AI-native digital partner for businesses that refuse to stay small.",
    type:        "website",
    locale:      "en_IN",
    siteName:    "SOYL Agency",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "SOYL Agency",
    description: "AI-native digital partner for businesses that refuse to stay small.",
    images: ["/images/og-image.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#080808",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${clash.variable} ${bebas.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body>
        <LenisProvider>
          <GrainOverlay />
          <CustomCursor />
          <LoadingScreen />
          <Navigation />
          <LayoutClient>
            {children}
          </LayoutClient>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
