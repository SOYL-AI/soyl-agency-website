"use client"

import { useEffect, useRef } from "react"

const ROW1 = [
  "SOYL AGENCY", "AI-NATIVE", "STORY OF YOUR LIFE", "BENGALURU",
  "SINCE 2024", "DIGITAL OPERATIONS", "AI AUTOMATION", "BRAND DESIGN",
]
const ROW2 = [
  "WEB & E-COMMERCE", "CUSTOM AI AGENTS", "PERFORMANCE MARKETING",
  "VISUAL IDENTITY", "CONTENT PRODUCTION", "ANALYTICS", "SOCIAL MEDIA",
]

interface MarqueeRowProps {
  items:     string[]
  direction: "left" | "right"
  speed?:    number
}

function MarqueeRow({ items, direction, speed = 35 }: MarqueeRowProps) {
  const trackRef     = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tlRef        = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    let tween: gsap.core.Tween

    const init = async () => {
      const { gsap } = await import("gsap")
      const track = trackRef.current
      if (!track) return

      const xTarget = direction === "left" ? "-50%" : "50%"
      const xStart  = direction === "left" ? "0%"   : "-50%"

      gsap.set(track, { x: xStart })

      tween = gsap.to(track, {
        x:        xTarget,
        duration: speed,
        ease:     "none",
        repeat:   -1,
      })

      tlRef.current = tween

      const container = containerRef.current
      if (container) {
        container.addEventListener("mouseenter", () => tween.pause())
        container.addEventListener("mouseleave", () => tween.resume())
      }
    }

    init()
    return () => { tlRef.current?.kill() }
  }, [direction, speed])

  // Duplicate items for seamless loop
  const allItems = [...items, ...items]

  return (
    <div
      ref={containerRef}
      style={{ overflow: "hidden", width: "100%" }}
    >
      <div
        ref={trackRef}
        style={{
          display:    "flex",
          whiteSpace: "nowrap",
          width:      "max-content",
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily:  "var(--font-label)",
              fontSize:    "0.7rem",
              letterSpacing: "0.2em",
              color:       "#FF5500",
              padding:     "0 2rem",
              opacity:     0.7,
            }}
          >
            {item}
            <span style={{ marginLeft: "2rem", opacity: 0.3 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div
      style={{
        padding:    "1.5rem 0",
        borderTop:  "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "#080808",
        overflow:   "hidden",
        display:    "flex",
        flexDirection: "column",
        gap:        "0.75rem",
      }}
    >
      <MarqueeRow items={ROW1} direction="left"  speed={40} />
      <MarqueeRow items={ROW2} direction="right" speed={32} />
    </div>
  )
}
