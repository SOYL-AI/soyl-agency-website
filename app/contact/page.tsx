import type { Metadata } from "next"
import Contact from "@/components/sections/Contact"

export const metadata: Metadata = {
  title:       "Contact — SOYL Agency",
  description: "Start your project with SOYL Agency. We respond within 24 hours.",
}

export default function ContactPage() {
  return (
    <main style={{ paddingTop: "80px" }}>
      <Contact />
    </main>
  )
}
