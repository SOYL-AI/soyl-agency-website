"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { useTextScramble } from "./useTextScramble"

interface TextScrambleProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
  speed?: number
  delay?: number
}

export default function TextScramble({
  text,
  className = "",
  as: Tag = "span",
  speed = 35,
  delay = 100,
}: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const { display } = useTextScramble({
    text,
    speed,
    delay,
    trigger: inView,
  })

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {display}
    </Tag>
  )
}
