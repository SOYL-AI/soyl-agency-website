"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

interface UseTextScrambleOptions {
  text: string
  speed?: number        // ms per character resolve
  scrambleSpeed?: number // ms between scramble ticks
  delay?: number        // ms before starting
  trigger?: boolean     // start when true
}

export function useTextScramble({
  text,
  speed = 40,
  scrambleSpeed = 30,
  delay = 0,
  trigger = true,
}: UseTextScrambleOptions) {
  const [display, setDisplay] = useState(text)
  const [isComplete, setIsComplete] = useState(false)
  const frameRef = useRef<number>(0)
  const hasRun = useRef(false)

  const scramble = useCallback(() => {
    if (hasRun.current) return
    hasRun.current = true
    setIsComplete(false)

    let resolvedCount = 0
    const totalChars = text.length

    const tick = () => {
      const now = Date.now()
      const chars = text.split("").map((char, i) => {
        if (char === " " || char === "\n") return char
        if (i < resolvedCount) return text[i]
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      setDisplay(chars.join(""))

      if (resolvedCount < totalChars) {
        resolvedCount++
        frameRef.current = window.setTimeout(tick, speed)
      } else {
        setDisplay(text)
        setIsComplete(true)
      }
    }

    // Initial scramble phase
    let scrambleCount = 0
    const maxScrambles = Math.min(8, Math.ceil(totalChars * 0.3))

    const scrambleTick = () => {
      const chars = text.split("").map((char) => {
        if (char === " " || char === "\n") return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      setDisplay(chars.join(""))
      scrambleCount++

      if (scrambleCount < maxScrambles) {
        frameRef.current = window.setTimeout(scrambleTick, scrambleSpeed)
      } else {
        tick()
      }
    }

    frameRef.current = window.setTimeout(scrambleTick, delay)
  }, [text, speed, scrambleSpeed, delay])

  useEffect(() => {
    if (trigger) {
      hasRun.current = false
      scramble()
    }
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current)
    }
  }, [trigger, scramble])

  return { display, isComplete }
}
