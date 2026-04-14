"use client"

import { useRef, useCallback } from "react"

interface CardSpotlightProps {
  children: React.ReactNode
  className?: string
  teal?: boolean
}

export default function CardSpotlight({
  children,
  className = "",
  teal = false,
}: CardSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty("--spot-x", `${x}px`)
    ref.current.style.setProperty("--spot-y", `${y}px`)
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${teal ? "card-spotlight-teal" : ""} ${className}`}
    >
      {children}
    </div>
  )
}
