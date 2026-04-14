"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface TypingTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorClassName?: string
  showCursor?: boolean
  onComplete?: () => void
}

export default function TypingText({
  text,
  speed = 35,
  delay = 500,
  className = "",
  showCursor = true,
  onComplete,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("")
  const [isDone, setIsDone] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!inView || hasStarted.current) return
    hasStarted.current = true

    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setIsDone(true)
          onComplete?.()

          // Blink cursor twice then hide
          setTimeout(() => setCursorVisible(false), 1600)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [inView, text, speed, delay, onComplete])

  return (
    <span ref={ref} className={className}>
      {displayed}
      {showCursor && cursorVisible && (
        <span className={`typing-cursor ${isDone ? "" : ""}`} />
      )}
    </span>
  )
}
