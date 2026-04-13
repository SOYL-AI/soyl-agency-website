"use client"

import { useRef } from "react"

interface MarqueeProps {
  children: React.ReactNode[]
  direction?: "left" | "right"
  speed?: number
  pauseOnHover?: boolean
  className?: string
  gap?: number
}

export default function Marquee({
  children,
  direction = "left",
  speed = 35,
  pauseOnHover = true,
  className = "",
  gap = 24,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right"

  // Duplicate children so the seam is invisible
  const items = [...children, ...children]

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
    >
      <div
        ref={trackRef}
        className={`flex ${animClass} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animationDuration: `${speed}s`,
          gap: `${gap}px`,
          width: "max-content",
        }}
      >
        {items.map((child, i) => (
          <div key={i} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
