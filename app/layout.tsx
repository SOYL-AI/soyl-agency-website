import type { Metadata, Viewport } from "next"
import "./globals.css"
import LenisProvider from "@/components/providers/LenisProvider"

export const viewport: Viewport = {
  themeColor: "#080808",
}

export const metadata: Metadata = {
  title: "SOYL Agency — India's First AI-Native Digital Operations Partner",
  description:
    "SOYL Agency gives Indian SMBs the same AI-powered operations that Fortune 500 companies use — delivered in 5-14 days at a fraction of the cost. Website, Automation, Marketing, AI Agents & more.",
  keywords: [
    "AI agency India",
    "SMB automation",
    "digital operations partner",
    "AI-powered marketing",
    "business automation India",
    "SOYL Agency",
  ],
  authors: [{ name: "SOYL AI Private Limited" }],
  openGraph: {
    title: "SOYL Agency — Run Your Business On AI",
    description:
      "AI-powered digital operations for Indian SMBs. Website, Marketing, Automation, CRM, AI Agents — one subscription.",
    url: "https://soyl.in",
    siteName: "SOYL Agency",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og_social_1776115380436.png",
        width: 1200,
        height: 630,
        alt: "SOYL Agency - Story Of Your Life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOYL Agency — India's First AI-Native Digital Operations Partner",
    description: "Run your entire business on AI. Starting at ₹4,999/month.",
    images: ["/images/og_social_1776115380436.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-soyl-bg text-soyl-white antialiased grain dot-grid overflow-x-hidden" suppressHydrationWarning>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
