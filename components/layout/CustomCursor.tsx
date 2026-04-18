"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useCursorStore } from "@/store/cursor"

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 }

const RING_SCALE: Record<string, number> = {
  default:   1,
  hover:     2.0,
  link:      2.0,
  cta:       2.5,
  crosshair: 1.0,
  drag:      3.0,
}

const RING_FILL: Record<string, string> = {
  link: "rgba(255,85,0,0.12)",
  cta:  "rgba(255,85,0,0.18)",
  drag: "rgba(255,85,0,0.08)",
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const { variant, label, isVisible, setPosition, setVisible } = useCursorStore()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const ringX = useSpring(rawX, SPRING_CONFIG)
  const ringY = useSpring(rawY, SPRING_CONFIG)

  const scale      = RING_SCALE[variant] ?? 1
  const ringFill   = RING_FILL[variant] ?? "transparent"
  const isCrosshair = variant === "crosshair"

  useEffect(() => {
    setMounted(true)
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  useEffect(() => {
    if (!mounted || isTouch) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setPosition(e.clientX, e.clientY)
      if (!isVisible) setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMove)
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
    }
  }, [mounted, isTouch, isVisible, rawX, rawY, setPosition, setVisible])

  if (!mounted || isTouch) return null

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          x:             rawX,
          y:             rawY,
          translateX:    "-50%",
          translateY:    "-50%",
          width:         8,
          height:        8,
          borderRadius:  "50%",
          background:    "#FF5500",
          pointerEvents: "none",
          zIndex:        10001,
          opacity:       isVisible ? 1 : 0,
          transition:    "opacity 0.2s",
        }}
        animate={{
          scale: variant === "cta" ? 1.5 : variant === "link" ? 0.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Ring — lags behind with spring */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          x:             ringX,
          y:             ringY,
          translateX:    "-50%",
          translateY:    "-50%",
          width:         32,
          height:        32,
          borderRadius:  isCrosshair ? "0%" : "50%",
          border:        `1.5px solid ${variant === "link" ? "#FF4D1A" : "#FF5500"}`,
          background:    ringFill,
          pointerEvents: "none",
          zIndex:        10000,
          opacity:       isVisible ? 0.8 : 0,
          transition:    "opacity 0.2s",
        }}
        animate={{
          scale:        scale,
          borderRadius: isCrosshair ? "0%" : "50%",
        }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {label && (
          <span
            style={{
              position:      "absolute",
              top:           "120%",
              left:          "50%",
              transform:     "translateX(-50%)",
              whiteSpace:    "nowrap",
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.6rem",
              letterSpacing: "0.1em",
              color:         "#FF5500",
              opacity:       0.8,
            }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
