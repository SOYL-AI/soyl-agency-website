"use client"

import { useEffect, useRef } from "react"
import type { StatItem } from "@/types"

const STATS: StatItem[] = [
  { value: 12,  suffix: "+",   label: "Businesses Transformed",  sub: "Across 8 industry verticals" },
  { value: 3,   suffix: "x",   label: "Average Revenue Growth",  sub: "For e-commerce clients in yr 1" },
  { value: 48,  suffix: "hr",  label: "Average Delivery Time",   sub: "From brief to first deliverable" },
  { value: 100, suffix: "%",   label: "AI-Native Stack",         sub: "Every workflow, intelligently powered" },
]

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const displayRef = useRef<HTMLSpanElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context

    const init = async () => {
      if (!cardRef.current || !displayRef.current) return
      const { gsap }          = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val:      stat.value,
          duration: 2.2,
          ease:     "power2.out",
          scrollTrigger: {
            trigger:      cardRef.current,
            start:        "top 80%",
            toggleActions: "play none none reset",
          },
          onUpdate() {
            if (displayRef.current) {
              const v = stat.value % 1 === 0
                ? Math.floor(obj.val)
                : obj.val.toFixed(1)
              displayRef.current.textContent = v + stat.suffix
            }
          },
        })
      })
    }

    init()
    return () => ctx?.revert()
  }, [stat])

  return (
    <div
      ref={cardRef}
      style={{
        flex:           "1 1 0",
        minWidth:       220,
        padding:        "2.5rem clamp(1.5rem, 3vw, 3rem)",
        borderRight:    index < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
        display:        "flex",
        flexDirection:  "column",
        gap:            "0.5rem",
      }}
    >
      <span
        ref={displayRef}
        style={{
          fontFamily:  "var(--font-display)",
          fontSize:    "clamp(3rem, 7vw, 6rem)",
          fontWeight:  700,
          letterSpacing: "-0.03em",
          color:       "#FF5500",
          lineHeight:  1,
        }}
      >
        0{stat.suffix}
      </span>

      <span
        style={{
          fontFamily:  "var(--font-body)",
          fontSize:    "1.0625rem",
          fontWeight:  600,
          color:       "#F5F4EE",
        }}
      >
        {stat.label}
      </span>

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize:   "0.7rem",
          letterSpacing: "0.06em",
          color:      "rgba(245,244,238,0.4)",
        }}
      >
        {stat.sub}
      </span>
    </div>
  )
}

export default function Stats() {
  return (
    <section
      style={{
        background:   "#0D0D0D",
        borderTop:    "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding:      "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)",
      }}
    >
      <div
        style={{
          display:  "flex",
          flexWrap: "wrap",
        }}
      >
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}
