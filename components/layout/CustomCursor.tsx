"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useVelocity } from "framer-motion"
import { useCursorStore } from "@/store/cursor"

// Ring follows mouse with this spring
const POS_SPRING   = { stiffness: 200, damping: 20, mass: 0.12 }
// Squash-stretch springs back elastically after deformation
const SCALE_SPRING = { stiffness: 380, damping: 26, mass: 0.08 }

const RING_SCALE: Record<string, number> = {
  default:   1,
  hover:     2.2,
  link:      2.0,
  cta:       2.8,
  crosshair: 1.0,
  drag:      3.2,
}

const RING_FILL: Record<string, string> = {
  link: "rgba(255,85,0,0.10)",
  cta:  "rgba(255,85,0,0.15)",
  drag: "rgba(255,85,0,0.07)",
}

export default function CustomCursor() {
  const [mounted, setMounted]   = useState(false)
  const [isTouch, setIsTouch]   = useState(false)
  const { variant, label, isVisible, setPosition, setVisible } = useCursorStore()

  // Exact cursor position
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Velocity of the raw position
  const velX = useVelocity(rawX)
  const velY = useVelocity(rawY)

  // Spring-lagged ring position
  const ringX = useSpring(rawX, POS_SPRING)
  const ringY = useSpring(rawY, POS_SPRING)

  // Squash-stretch targets → springs give them elastic return
  const rawSX = useMotionValue(1)
  const rawSY = useMotionValue(1)
  const scaleX = useSpring(rawSX, SCALE_SPRING)
  const scaleY = useSpring(rawSY, SCALE_SPRING)

  const variantScale = RING_SCALE[variant] ?? 1
  const fill         = RING_FILL[variant] ?? "transparent"
  // Dot shrinks to nothing when ring is already filled/enlarged
  const dotScale     = variant === "cta" || variant === "link" ? 0 : 1

  useEffect(() => {
    setMounted(true)
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  // Reset stretch when leaving default state
  useEffect(() => {
    if (variant !== "default") {
      rawSX.set(1)
      rawSY.set(1)
    }
  }, [variant, rawSX, rawSY])

  // Squash-and-stretch: deform ring in the dominant axis of movement
  useEffect(() => {
    if (!mounted || isTouch) return

    const unsub = velX.on("change", () => {
      if (variant !== "default") return

      const vx    = velX.get()
      const vy    = velY.get()
      const speed = Math.sqrt(vx * vx + vy * vy)
      // stretch ramps from 0 → 0.44 as speed goes 0 → 2800 px/s
      const stretch = Math.min(speed / 2800, 1) * 0.44

      if (stretch < 0.04) {
        rawSX.set(1)
        rawSY.set(1)
      } else if (Math.abs(vx) >= Math.abs(vy)) {
        // Horizontal movement → widen, compress vertically
        rawSX.set(1 + stretch)
        rawSY.set(1 / (1 + stretch * 0.65))
      } else {
        // Vertical movement → taller, compress horizontally
        rawSY.set(1 + stretch)
        rawSX.set(1 / (1 + stretch * 0.65))
      }
    })

    return unsub
  }, [mounted, isTouch, variant, velX, velY, rawSX, rawSY])

  // Track mouse position
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

    window.addEventListener("mousemove", onMove, { passive: true })
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
      {/* Precise dot — snaps to cursor exactly, no lag */}
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
          width:         6,
          height:        6,
          borderRadius:  "50%",
          background:    "#FF5500",
          pointerEvents: "none",
          zIndex:        10001,
        }}
        animate={{
          scale:   dotScale,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Morphic ring — springs behind cursor + squash-stretch deformation */}
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
          width:         34,
          height:        34,
          borderRadius:  "50%",
          border:        "1.5px solid #FF5500",
          background:    fill,
          pointerEvents: "none",
          zIndex:        10000,
          scaleX,
          scaleY,
        }}
        animate={{
          scale:        variantScale,
          opacity:      isVisible ? 0.85 : 0,
          borderRadius: variant === "crosshair" ? "3px" : "50%",
          borderColor:  variant === "link" ? "#FF4D1A" : "#FF5500",
        }}
        transition={{
          scale:        { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
          opacity:      { duration: 0.2 },
          borderRadius: { duration: 0.2 },
          borderColor:  { duration: 0.15 },
        }}
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
