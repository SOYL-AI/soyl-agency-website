"use client"

import { useRef, useLayoutEffect, useState } from "react"

interface ProgressRingProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  bgColor?: string
  className?: string
  children?: React.ReactNode
}

export default function ProgressRing({
  value,
  max = 100,
  size = 120,
  strokeWidth = 3,
  color = "#F5A623",
  bgColor = "rgba(255,255,255,0.06)",
  className = "",
  children,
}: ProgressRingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const [mounted, setMounted] = useState(false)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useLayoutEffect(() => {
    setMounted(true)
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!circleRef.current || !ref.current) return

      ctx = gsap.context(() => {
        const progress = Math.min(value / max, 1)
        const targetDashoffset = circumference * (1 - progress)

        gsap.fromTo(
          circleRef.current,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: targetDashoffset,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.8,
            },
          }
        )
      }, ref)
    }

    init()
    return () => ctx?.revert()
  }, [value, max, circumference])

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? circumference : 0}
          style={{ transition: "none" }}
        />
      </svg>
      {/* Content in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
