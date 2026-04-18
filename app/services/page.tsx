import type { Metadata } from "next"
import Services from "@/components/sections/Services"
import Stats    from "@/components/sections/Stats"

export const metadata: Metadata = {
  title:       "Services — SOYL Agency",
  description: "AI automation, web design, performance marketing, brand identity, content, social media, and analytics. SOYL Agency does it all.",
}

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: "80px" }}>
      <div style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem) 0" }}>
        <p
          style={{
            fontFamily:  "var(--font-mono)",
            fontSize:    "0.7rem",
            letterSpacing: "0.15em",
            color:       "rgba(232,160,32,0.6)",
            marginBottom: "1rem",
          }}
        >
          [ WHAT WE DO ]
        </p>
        <h1
          style={{
            fontFamily:  "var(--font-display)",
            fontSize:    "clamp(3rem, 9vw, 6.5rem)",
            fontWeight:  700,
            letterSpacing: "-0.04em",
            lineHeight:  0.9,
            color:       "#F0EDE6",
          }}
        >
          Every tool<br />you need.
        </h1>
      </div>
      <Services />
      <Stats />
    </main>
  )
}
