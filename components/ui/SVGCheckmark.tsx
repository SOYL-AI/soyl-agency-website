"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SVGCheckmarkProps {
  size?: number
  color?: string
  delay?: number
  className?: string
}

export default function SVGCheckmark({
  size = 13,
  color = "currentColor",
  delay = 0,
  className = "",
}: SVGCheckmarkProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20px" })

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <motion.path
        d="M3 8.5L6.5 12L13 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          pathLength: { duration: 0.4, ease: "easeOut", delay },
          opacity: { duration: 0.1, delay },
        }}
      />
    </svg>
  )
}
