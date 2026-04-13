"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

export default function AnimatedCounter({
  end,
  duration = 2200,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      setCount(Math.round(eased * end * 10) / 10)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasStarted, end, duration])

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString("en-IN")

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
