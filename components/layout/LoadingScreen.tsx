"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLoadingStore } from "@/store/loading"

const WORDS = ["Story", "Of", "Your", "Life"]

export default function LoadingScreen() {
  const { isLoading, done } = useLoadingStore()
  const [phase, setPhase] = useState<"wordmark" | "tagline" | "bar" | "out">("wordmark")

  useEffect(() => {
    if (!isLoading) return

    const t1 = setTimeout(() => setPhase("tagline"), 900)
    const t2 = setTimeout(() => setPhase("bar"),     1600)
    const t3 = setTimeout(() => {
      setPhase("out")
      setTimeout(done, 600)
    }, 2400)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [isLoading, done])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         9998,
            background:     "#080808",
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "2rem",
          }}
        >
          {/* SOYL Wordmark — SVG stroke draw */}
          <motion.svg
            viewBox="0 0 120 32"
            width="180"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.text
              x="0"
              y="28"
              fontSize="32"
              fontWeight="700"
              fill="none"
              stroke="#FF5500"
              strokeWidth="0.8"
              fontFamily="var(--font-display)"
              letterSpacing="-1"
              initial={{ strokeDashoffset: 600, strokeDasharray: 600, opacity: 1 }}
              animate={{
                strokeDashoffset: 0,
                fill: phase !== "wordmark" ? "#FF5500" : "none",
                transition: { duration: 0.9, ease: "easeOut" },
              }}
            >
              SOYL
            </motion.text>
          </motion.svg>

          {/* Tagline — word by word */}
          <div
            style={{
              display:  "flex",
              gap:      "0.75rem",
              height:   "1.5rem",
              overflow: "hidden",
            }}
          >
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  phase === "tagline" || phase === "bar" || phase === "out"
                    ? { opacity: 1, y: 0 }
                    : {}
                }
                transition={{ delay: i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.75rem",
                  letterSpacing: "0.12em",
                  color:         "#F5F4EE",
                  opacity:       0.7,
                  textTransform: "uppercase",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div
            style={{
              position:   "absolute",
              bottom:     0,
              left:       0,
              right:      0,
              height:     "2px",
              background: "#111111",
            }}
          >
            <motion.div
              initial={{ scaleX: 0, originX: "left" }}
              animate={
                phase === "bar" || phase === "out"
                  ? { scaleX: 1, originX: "left" }
                  : {}
              }
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height:          "100%",
                background:      "#FF5500",
                transformOrigin: "left",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
